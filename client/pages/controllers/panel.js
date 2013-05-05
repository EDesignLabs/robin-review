
var t = Template.panel

t.helpers({
	users: function(){return Rooms.findOne({_id:Global.roomId}).users},
	workbooks: function(){return Structures.find({}).distinct("workbookSlug")}
})

t.events({
	"click button#stop": function(){
		
	}, 
	"click button.boot": function(){
		Rooms.update({_id:Global.roomId}, {$pull: {'users': {_id:this._id}}})
	}, 
	"change select.workbook": function (event){
		Rooms.update({_id:Global.roomId}, {$set:{workbook:$(event.target).find('option:selected').val()}})
	}
})



