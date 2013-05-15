if (Meteor.isClient) {
	Global = {}
	Meteor.startup(function () {
	    Global.userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
	})
}

Structures = new Meteor.Collection("structures");
Workbooks = new Meteor.Collection("workbooks");  
Activities = new Meteor.Collection("activities"); 
Rooms = new Meteor.Collection("rooms"); 

ActivityManifest = {
	comment:"Comment Activity",
	confirmation:"Confirmation Activity",
	ruberic:"Ruberic Activity"
}

