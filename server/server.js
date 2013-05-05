Meteor.startup(function () {
// code to run on server at startup
	Meteor.methods({

/*
        addActivitySet: function (settings, user, users) {
            Users.update(
		      { roomId:user.roomId, isAdmin: false, _id:{ $ne: user._id }},
		      { $push: { todos: settings } },
		      { multi: true }
		    )

            var count =  Users.find({ roomId:user.roomId, isAdmin: false, _id:{ $ne: user._id }}).count()

			Users.update( 
				{ _id: user._id },
				{ $inc: { completes: count } } 
			);
        }

*/

    });

});
