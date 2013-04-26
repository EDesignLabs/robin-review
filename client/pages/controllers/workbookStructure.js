var t = Template.workbookStructure

t.helpers({
	activities: function(){
		var arr = [];
		for (var key in activityManifest) {
		    if (activityManifest.hasOwnProperty(key)) {
		        arr.push({'key': key , 'value': activityManifest[key]});
		    }
		}
		return arr
	},
	currentStructure: function(){
		if (Session.get('currentStructure') && Template[Session.get('currentStructure')])
			return Template[Session.get('currentStructure')]();
		else
			return ''
	}
})

t.events = {
	"change select": function (event){
		Session.set('currentStructure', $(event.target).find('option:selected').val() + "Structure")
	}
};
