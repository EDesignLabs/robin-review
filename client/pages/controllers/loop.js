var t = Template.loop

console.log('reset///')
t.seenStructures = []

t.helpers({
	loopActivityTemplate: function(){

		if (Session.get('loopActivityTemplate') && Template[Session.get('loopActivityTemplate')])
			return Template[Session.get('loopActivityTemplate')]();
		
	
	}
})


t.start = function(){
    console.log('////////////////STARTING LOOOP//////////////')
    Session.set('loopActivityTemplate', "")

    var workbookSlug = Rooms.findOne({_id:Global.roomId}).workbook
    var structures = Structures.find({'workbookSlug':workbookSlug, _id:{$nin:t.seenStructures} }).fetch();
    t.currStructure = structures[Math.floor(Math.random()*structures.length)];
  
    //Activities.find({roomId:Global.roomId, userId:{$ne:Global.userId}}).fetch()
    //Meteor.setTimeout(t.start, 4000)

	if ( t.currStructure ){
		console.log('Current Structure:', t.currStructure)
		
		Session.set('loopActivityTemplate', t.currStructure.structureSlug + "Create")
		t.seenStructures.push(t.currStructure._id)
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