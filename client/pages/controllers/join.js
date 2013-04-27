var t = Template.join

t.helpers({
  roomId: function() { return Session.get('currentRoomId'); },
})

t.events({
  'click button#join' : function () {

	var query = Users.find({roomId:Session.get('currentRoomId'), isAdmin:true});
	var handle = query.observeChanges({
	  added: function (id, obj) {
	    console.log('added')
	  },
	  removed: function () {
	    
	  },
	  changed:function (id, change) {
	  	console.log('changed', change)

		if (change.roomStatus && change.roomStatus == 'start'){
			if (Users.findOne({_id: Session.get('userId') }).isAdmin)
				Meteor.Router.to('/panel');
			else
				Meteor.Router.to('/loop');
		}
				
	  	
	  	
	  }
	});


  	var isAdmin = false;

  	if (Users.find({roomId: Session.get('currentRoomId')}).count() == 0)
  		isAdmin = true;

	Session.set('userId', Users.insert({
		roomId: Session.get('currentRoomId'),
		name: $('input#username').val(),
		'isAdmin': isAdmin
	}))



	Meteor.Router.to('/lobby/'+Session.get('currentRoomId'));
  }
});