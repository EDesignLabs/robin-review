Structures = new Meteor.Collection("structures");
Workbooks = new Meteor.Collection("workbooks"); 
Users = new Meteor.Collection("users"); 
Activities = new Meteor.Collection("activities"); 

ActivityManifest = {
	comment:"Comment Activity",
	rank:"Rank Activity"
}


User = (function () {
	var user = {}

	function privateMethod() {
		
	}

	user.get = function(){return Users.findOne({_id:Session.get('userId')})}


	return user;
}());