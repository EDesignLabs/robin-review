Template.confirmationStructure.events = {
	"click button": function (event){
		Helpers.updateStructure({
			highlight: $('textarea#highlight').val(),
			question: $('textarea#question').val(),
			noun: $('input#noun').val(),
		})
	}
};

Template.confirmationCreate.events = {
	"click button": function (event){
		Template.loop.create({
			userHighlighted: $('#highlighter-confirm').text(),
			userContext: Global.userText
		})
	}
};

Template.confirmationAction.events = {
	"click button#complete": function (event){
		Template.loop.complete({
			confirmation: $('#highlighter-confirm').text()
		})
	}
};