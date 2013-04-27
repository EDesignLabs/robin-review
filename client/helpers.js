for (var t in Template){
	Session.get('structureId')

    Template[t].helpers(
    	{
    		structure:function(){
    			return Structures.findOne({_id:Session.get('structureId')})
    		}
    	}
    )
}


Template.helpers = {
	addStructuredActivity:function(settings){
		if (Session.get('structureId')){
			Structures.update(
			   { _id: Session.get('structureId') },
			   { $set: settings }
			)
			Session.set('structureId', undefined)
		}
		else{
			settings.workbookSlug = Session.get('workbookSlug');
			settings.structureSlug = Session.get('structureSlug');
			Session.set('structureSlug', '')
			Structures.insert(settings);
		}

		Meteor.Router.to('/workbook');
	}
}

