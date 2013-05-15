for (var n in Template){
  Template[n].user = function(){
    var users = Rooms.findOne({_id:Global.roomId}, {reactive:false} ).users
    
    if (users)
      for (var i = 0; i < users.length; i++) {
        if (users[i].id == Global.userId)
          return users[i]
      };

    console.log('warning no user found.')
    return undefined

  }
  Template[n].structure = function(){ return Template.loop.currStructure }
  Template[n].activity = function(){ return Template.loop.currActivity.settings }
}

Helpers = {
  currentActivity: {},
  uniqueId: function(){ return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);}); }, 
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



