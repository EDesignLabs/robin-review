Template.rubericStructure.events = {
	"click button": function (event){
		Helpers.updateStructure({
			highlight: $('input#highlight').val(),
			header: $('input#header').val(),
			onestarchoice: $('input#onestarchoice').val(),
			twostarchoice: $('input#twostarchoice').val(),
			threestarchoice: $('input#threestarchoice').val()
		})
	}
};

Template.rubericCreate.events = {
	"click button": function (event){
		Template.loop.create({
			userHighlighted: $('#highlighter-confirm').text()
		})
	}
};

Template.rubericAction.events = {
	"click button.btn-radio": function (event){
		console.log($(event.toElement));
		$('.btn-radio').removeClass('active')
		$(event.toElement).addClass('btn-radio active')

	},
	"click button.next": function (event){
		Template.loop.complete({
			choice: $('.btn-radio.active').attr('id'),
			comment: $('textarea').val();
		})
	},
	"click button.show-comment": function (event){
		$('.commentbox').slideDown();
		$('button.show-comment').slideUp();
		console.log('test')
	}
};

Template.rubericResult.helpers({
	collate: function (){

		var flat = {};
		var act =  Activities.find({userId:Global.userId}).fetch()
		for (var i = 0; i < act.length; i++) {
			if (act[i].results)
				for (var j = 0; j < act[i].results.length; j++) {
					var item = act[i].results[j]

					for (var key in item) {
					  if (item.hasOwnProperty(key)) {

						if (flat[item[key]] == undefined)
							flat[item[key]] = 1;
						else
							flat[item[key]]++;

					  }
					}


					
				}
		};
		return flat;
	}
});

