
var t = Template.results

t.helpers({
	results: function(){ 
		return User.get().todosComplete

	},
})

t.events({

})

