

var t = Template.workbook


t.helpers({
	structures: function(){return Structures.find({workbookSlug: Session.get("workbookSlug")});},
	workbookSlug: function(){return Session.get('workbookSlug')},
	prettyPrintStructure: function(slug){
		return ActivityManifest[slug]
	}
})

t.events = {
	"click #load": function (){
		Session.set('workbookSlug', $('input').val())
	},
	"click #add": function(){
		Meteor.Router.to('/workbook/structure');
	},
	"click button.edit": function(){
		Session.set('structureId', this._id)
		Meteor.Router.to('/workbook/structure');
	},
	"click button.remove": function(){
		Structures.remove({_id:this._id})
	}

	
};

