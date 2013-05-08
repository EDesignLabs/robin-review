var t = Template.loop

console.log('reset///')
t.seenStructures = []
t.seenActivities = []
t.seenNewFlag = [];

t.helpers({
	loopActivityTemplate: function(){

		if (Session.get('loopActivityTemplate') && Template[Session.get('loopActivityTemplate')])
			return Template[Session.get('loopActivityTemplate')]();
		
	
	}
})


t.start = function(){
    console.log('////////////////STARTING LOOOP//////////////!')
    Session.set('loopActivityTemplate', "")

    if(!(Rooms.findOne({_id:Global.roomId}).active)){
    	Meteor.Router.to('/results/'+Global.roomSlug);
    }else if ( Rooms.findOne({_id:Global.roomId}).newFlag != t.seenNewFlag){
    	console.log('new flag!')
		t.seenNewFlag = Rooms.findOne({_id:Global.roomId}).newFlag; 
		t.initCreate()
	}else{

		console.log('Searching for new activities')
		var activities = Activities.find({roomId:Global.roomId,  _id:{$nin:t.seenActivities}, userId:{$ne:Global.userId}}).fetch();
		console.log('activities', activities)

		if (activities.length > 0){
			t.currActivity = activities[Math.floor(Math.random()*activities.length)];
			t.seenStructures.push(t.currActivity._id)
			Session.set('loopActivityTemplate', t.currActivity.structure.structureSlug + "Action")
			console.log(' t.currActivity',  t.currActivity)
		}else{
			//call others to create activities...
			t.seenNewFlag = Helpers.uniqueId();
			Rooms.update({_id:Global.roomId}, {$set: { 'newFlag': t.seenNewFlag }})
			t.initCreate()
		}

		
	

	}

	


}

t.initCreate = function(){
	console.log('....initiating structure creation.....')

	var workbookSlug = Rooms.findOne({_id:Global.roomId}).workbook
    var structures = Structures.find({'workbookSlug':workbookSlug, _id:{$nin:t.seenStructures} }).fetch();
       
    console.log('workbookSlug', workbookSlug)
    console.log('structures', structures)

    if (structures.length > 0){
    	t.currStructure = structures[Math.floor(Math.random()*structures.length)];
		t.seenStructures.push(t.currStructure._id)
		Session.set('loopActivityTemplate', t.currStructure.structureSlug + "Create")
		console.log(' t.currStructure',  t.currStructure)
	}else{
		console.log(' -- no structure found looping -- ')
		Session.set('loopActivityTemplate', "waitingForData")
		Meteor.setTimeout(t.start, 2000)
	}
}


t.create = function(settings){
	var activity = {
		'settings': settings, 
		'structure': t.currStructure,
		'userId': Global.userId,
		'roomId': Global.roomId
	}

	Activities.insert( activity )
	t.start()
}

t.complete = function (){


}