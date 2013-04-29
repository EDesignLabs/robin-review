
var t = Template.panel

t.helpers({
	users: function(){return Users.find({roomId:Session.get('currentRoomId')})}
})

t.events({
	"click button#stop": function(){
		Users.update(
		   {_id:Session.get('userId')},
		   {
		     $set: { 'roomStatus': 'stop'},
		   }
		)
	}

})



