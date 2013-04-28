
var t = Template.panel

t.helpers({})

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



