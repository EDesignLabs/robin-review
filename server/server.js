Meteor.startup(function () {
// code to run on server at startup
	Meteor.methods({
		
        addActivitySet: function (settings, myRoomId) {
            Users.update(
		      { roomId:myRoomId, isAdmin: false},
		      { $push: { todos: settings } },
		      { multi: true }
		    )
        }

    });

});
