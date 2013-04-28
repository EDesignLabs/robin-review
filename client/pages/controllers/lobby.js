
var t = Template.lobby

t.helpers({
	users: function(){return Users.find({roomId:Session.get('currentRoomId')})},
	workbooks: function(){return Structures.find({}).distinct("workbookSlug")}
})

t.events({
	"click button.boot":function(){
		Users.remove({_id:this._id})
	},
	"click button#start":function(){

		Users.update(
		   {_id:Session.get('userId')},
		   {
		     $set: { 'roomStatus': 'start', 'workbookSlug': Session.get('currentWorkbookSlug')},
		   }
		)

	},
	"change select": function (event){
		Session.set('currentWorkbookSlug', $(event.target).find('option:selected').val())
	}
})

