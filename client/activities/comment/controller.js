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
		Template.loop.create({
			userHighlighted: $('#highlighter-confirm').text()
		})
	}
};

Template.commentAction.events = {
	"click button#complete": function (event){
		console.log("Complete...")
		Helpers.completeActivity({
			comment: $('textarea').val()
		})
	}
};