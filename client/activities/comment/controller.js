
Template.commentStructure.events = {
	"click button": function (event){
		Template.helpers.addStructuredActivity({
			highlight: $('input#highlight').val(),
			question: $('input#question').val()
		})
		
	}
};
