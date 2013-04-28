Template.commentStructure.events = {
	"click button": function (event){
		Helpers.updateStructure({
			highlight: $('input#highlight').val(),
			question: $('input#question').val()
		})
	}
};

Template.commentCreate.events = {
	"click button": function (event){
		Helpers.createActivity({
			userHighlighted: $('#highlighter-confirm').text()
		})
	}
};