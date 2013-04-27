var t = Template.workbookStructure

t.helpers({
	structureId: function() {return Session.get('structureId')},
	activities: function(){
		var arr = [];
		for (var key in ActivityManifest) {
		    if (ActivityManifest.hasOwnProperty(key)) {
		        arr.push({'key': key , 'value': ActivityManifest[key]});
		    }
		}
		return arr
	},
	structureTemplate: function(){

		if (Session.get('structureId')){
			return Template[Structures.findOne({_id:Session.get('structureId')}).structureSlug+ "Structure"]();
		}

		var templateName = Session.get('structureSlug') + "Structure"
		if (Session.get('structureSlug') && Template[templateName])
			return Template[templateName]();


		return ''

	}
})

t.events = {
	"change select": function (event){
		Session.set('structureSlug', $(event.target).find('option:selected').val())
	}
};
