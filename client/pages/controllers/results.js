
var t = Template.results

t.helpers({
	results: function(){ 
		return Activities.find({userId:Global.userId}).fetch();
	},
})

t.events({

})

