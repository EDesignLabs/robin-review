
var t = Template.results

t.helpers({
	results: function(){ 
		var results = [];
		var act =  Activities.find({userId:Global.userId}).fetch()
		for (var i = 0; i < act.length; i++) {
			if (act[i].results)
				for (var j = 0; j < act[i].results.length; j++) {
					act[i].results[j].activity = act[i];
					var result = {}
					_.extend(result, act[i])
					result['result'] = act[i].results[j]
					results.push(result)
				}
		};

		console.log(results);
		return results;
	}
})


t.events({
	"click button": function(){
		console.log('bobsss')
		Meteor.call(
			'sendEmail',
            $('input').val(),
            'rr@rr.com',
            'Hello from Robin Reveiw!',
            $('#email').html()
        );
	}, 
})


