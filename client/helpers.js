for (var n in Template){
  Template[n].user = function(){return Users.findOne({_id:Session.get('userId')})}
  Template[n].structure = function(){ return Structures.findOne({_id:Session.get('structureId')}) }
  Template[n].activity = function(){ return Activities.findOne({_id:Session.get('activityId')}) }
}

Helpers = {
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

      if (isNaN(Session.get('onStructureIndex')))
        Session.set('onStructureIndex', 0)
      else
        Session.set('onStructureIndex', Session.get('onStructureIndex') + 1)
      
      var struct = Structures.find({workbookSlug:Session.get('currentWorkbookSlug')}).fetch()[Session.get('onStructureIndex')]
      Session.set('structureId', struct._id)
      
      console.log('curr user:' ,Template.loop.user())
      console.log('curr structure:' ,Template.loop.structure())
      console.log('curr activity:' ,Template.loop.activity())

      Session.set('loopActivityTemplate', Template.loop.structure().structureSlug + "Create")

  },
  createActivity:function(settings){
    settings.structure = Template.loop.structure

    Meteor.call("addActivitySet", settings, Template.join.user().roomId)

    

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



