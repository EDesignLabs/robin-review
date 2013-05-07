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


    

	//

    //
    //

    if(!(Rooms.findOne({_id:Global.roomId}).active)){
    	Meteor.Router.to('/results/'+Global.roomSlug);
    }else if ( Rooms.findOne({_id:Global.roomId}).newFlag != t.seenNewFlag){
		t.seenNewFlag = Rooms.findOne({_id:Global.roomId}).newFlag; 
		t.initCreate()
	}else{

		console.log('Searching for new activities')
		var activities = Activities.find({roomId:Global.roomId,  _id:{$nin:t.seenActivities}, userId:{$ne:Global.userId}}).fetch();
		console.log('activities', activities)

		if (activities.length > 0){

		}else{
			//call others to create activities...
			// then
			t.initCreate()
		}

		
	

	}

	


}

t.initCreate = function(){
	console.log('....initiating structure creation.....')

	var workbookSlug = Rooms.findOne({_id:Global.roomId}).workbook
    var structures = Structures.find({'workbookSlug':workbookSlug, _id:{$nin:t.seenStructures} }).fetch();
    t.currStructure = structures[Math.floor(Math.random()*structures.length)];
    
    console.log('workbookSlug', workbookSlug)
    console.log('structures', structures)
    console.log(' t.currStructure',  t.currStructure)

    if (t.currStructure){
    	Session.set('loopActivityTemplate', t.currStructure.structureSlug + "Create")
		t.seenStructures.push(t.currStructure._id)
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