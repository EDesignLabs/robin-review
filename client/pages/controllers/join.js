var t = Template.join

t.helpers({
	roomId: function() { return Global.roomSlug; },
	isInRoomFirst: function() { 
		return (Rooms.find({ slug: Global.roomSlug, active: true }).count() == 0)
	}
})

t.events({ 
  'click button#join' : function () {

  	if (Rooms.find({
  			slug: Global.roomSlug, 
  			active: true 
  		}).count() == 0)
  	{
		Global.roomId = Rooms.insert({
			slug: Global.roomSlug,
			admin: {id: Global.userId, name: $('input#username').val()},
			active: true,
			workbook:'oneHasNotBeenSet',
			users: []
		})

		Global.isAdmin = true
  	}else{

  		Global.roomId = Rooms.findOne({ slug: Global.roomSlug, active: true })._id;

  		var user = {
  			id: Global.userId,
			name: $('input#username').val(),
			text: $('textarea').val()
		}

  		Rooms.update(
  			{ _id: Global.roomId },
  			{ $push: { users: user } }
  		)
		

  	}

  	Meteor.Router.to('/loop/'+Global.roomSlug);


  }
});