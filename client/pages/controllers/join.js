var t = Template.join

t.helpers({
  roomId: function() { return Session.get('currentRoomId'); },
  isAlone: function() {	return Users.find({roomId: Session.get('currentRoomId')}).count() == 0}
})

t.events({
  'click button#join' : function () {

	var query = Users.find({roomId:Session.get('currentRoomId'), isAdmin:true});
	var handle = query.observeChanges({
	  added: function (id, obj) {
	    //console.log('added')
	  },
	  removed: function () {
	    
	  },
	  changed:function (id, change) {

	  	console.log('Admin change',change )

		if (change.roomStatus && change.roomStatus == 'start'){

			Session.set('currentWorkbookSlug', change.workbookSlug)

			if (Users.findOne({_id: Session.get('userId') }).isAdmin)
				Meteor.Router.to('/panel/'+Session.get('currentRoomId'));
			else{
			  	Helpers.loop()
				Meteor.Router.to('/loop/'+Session.get('currentRoomId'));
			}

			
		}
				
	  	
	  	
	  }
	});


  	var isAdmin = false;

  	if (Users.find({roomId: Session.get('currentRoomId')}).count() == 0)
  		isAdmin = true;

	Session.set('userId', Users.insert({
		roomId: Session.get('currentRoomId'),
		name: $('input#username').val(),
		text: $('textarea').val(),
		'isAdmin': isAdmin
	}))



	Meteor.Router.to('/lobby/'+Session.get('currentRoomId'));
  }
});