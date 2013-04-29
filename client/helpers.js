for (var n in Template){
  Template[n].user = function(){return User.get()}
  Template[n].structure = function(){ return Structures.findOne({_id:Session.get('structureId')}) }
  Template[n].activity = function(){ return Helpers.currentActivity }
}

Helpers = {
  currentActivity: {},
	updateStructure:function(settings){
		if (Session.get('structureId')){
			Structures.update(
			   { _id: Session.get('structureId') },
			   { $set: settings }
			)
		}
		else{
			settings.workbookSlug = Session.get('workbookSlug');
			settings.structureSlug = Session.get('structureSlug');
			Session.set('structureSlug', '')
			Structures.insert(settings);
		}

		Session.set('structureId', undefined)

		Meteor.Router.to('/workbook');
	},
  loop:function(){

    console.log('////////////////STARTING LOOOP//////////////')

    Session.set('onStructureIndex', Session.get('onStructureIndex') + 1)

    var structureCount = Structures.find({workbookSlug:Session.get('currentWorkbookSlug')}).count()
    var users = Users.find({ roomId:User.get().roomId, isAdmin: false, _id:{ $ne: User.get()._id }})

    if ( Session.get('onStructureIndex') <  structureCount && User.get().completes < users.count()/2){
      

      console.log('completes', User.get().completes )
      console.log('user counts', users.count() )
      console.log('onStructureIndex', Session.get('onStructureIndex') )
      console.log('structureCount', structureCount )

      var struct = Structures.find({workbookSlug:Session.get('currentWorkbookSlug')}).fetch()[Session.get('onStructureIndex')]
      Session.set('structureId', struct._id)
      Session.set('loopActivityTemplate', Template.loop.structure().structureSlug + "Create")
    }else if (User.get().todos && User.get().todos.length > 0) {

      Helpers.currentActivity = User.get().todos.slice(-1)[0]
      Users.update( {_id:Session.get('userId')}, { $pop: { todos: 1 } } )
        
      console.log("Current Activity:",Helpers.currentActivity)

      Session.set('loopActivityTemplate', Helpers.currentActivity.structure.structureSlug + "Action")
    }else{

      Session.set('loopActivityTemplate', "waitingForData")
      console.log('Nothing todo. Looping....')
      Meteor.setTimeout(Helpers.loop, 4000)

    }
      





    console.log('curr user:' ,Template.loop.user())
    console.log('curr structure:' ,Template.loop.structure())
    console.log('curr activity:' ,Template.loop.activity())

    

  },
  createActivity:function(settings){
    settings.structure = Template.loop.structure()
    settings.creatorId = Template.loop.user()._id

    Meteor.call("addActivitySet", settings, User.get())

    Helpers.loop()

  },
  completeActivity:function(result){

    result.completorId = Template.loop.user()._id
    _.extend(Helpers.currentActivity, {result : result});
    
    Users.update(
      { _id:Helpers.currentActivity.creatorId},
      { $push: { todosComplete: Helpers.currentActivity }}
    )

      Users.update( 
        { _id: Helpers.currentActivity.creatorId },
        { $inc: { completes: -1 } } 
      );

    Session.set('loopActivityTemplate', "")
    Helpers.loop()

  }
}

//http://stackoverflow.com/questions/14514733/does-meteor-have-a-distinct-query-for-collections
LocalCollection.Cursor.prototype.distinct = function (key) {
  var self = this;

  if (self.db_objects === null)
    self.db_objects = self._getRawObjects(true);

  var res = {};
  _.each(self.db_objects,function(value){

    if(!res[value[key]]){
        res[value[key]] = value;
    }
  });
  return _.values(res);
};


$(function () {

  $('body').on('mouseup', '#highlighter', function (e) {
      console.log('testssss')

      var html = "";
      if (typeof window.getSelection != "undefined") {
          var sel = window.getSelection();
          if (sel.rangeCount) {
              var container = document.createElement("div");
              for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                  container.appendChild(sel.getRangeAt(i).cloneContents());
              }
              html = container.innerHTML;
          }
      } else if (typeof document.selection != "undefined") {
          if (document.selection.type == "Text") {
              html = document.selection.createRange().htmlText;
          }
      }

      $("#highlighter-confirm").text(html)
    });
});



