
var t = Template.lobby

t.helpers({
	user: function(){return Users.findOne({_id:Session.get('userId')})},
	users: function(){return Users.find({roomId:Session.get('currentRoomId')})}
})

t.events({
	"click button.boot":function(){
		Users.remove({_id:this._id})
	},
	"click button#start":function(){
		console.log('start')
		Users.update(
		   {_id:Session.get('userId')},
		   {
		     $set: { 'hasStarted': true },
		   }
		)



		console.log(Session.get('userId'))
	}
})



