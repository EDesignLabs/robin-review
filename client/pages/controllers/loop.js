
var t = Template.loop

t.helpers({
	loopActivityTemplate: function(){

		if (Session.get('loopActivityTemplate') && Template[Session.get('loopActivityTemplate')])
			return Template[Session.get('loopActivityTemplate')]();
		
	
	}
})

t.events({})



