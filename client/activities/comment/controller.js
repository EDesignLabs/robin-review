var structure = Template.commentStructure

structure.events = {
	"click button": function (event){
		Session.get('workbookSlug');
		Meteor.Router.to('/workbook');
	}
};
