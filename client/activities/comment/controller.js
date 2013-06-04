Template.commentStructure.events = {
	"click button": function (event){
		Helpers.updateStructure({
			highlight: $('textarea#highlight').val(),
			question: $('textarea#question').val()
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
		Template.loop.complete({
			comment: $('textarea').val()
		})
	}
};