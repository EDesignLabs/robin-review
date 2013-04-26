Meteor.Router.add({
	'/workbook': function(id) {
      return 'workbook';
    },
    '/join/:id': function(id) {
      Session.set('currentRoomId', id);
      return 'join';
    },
    '/lobby/:id': function(id){
    	console.log(Session.get('currentRoomId'))
    	if (Session.get('currentRoomId'))
    		return 'lobby'
    	else
    		window.location = "/join/"+id //not ideal but it will do
    },
    '/workbook/structure': function(){ return 'workbookStructure'},
    
    '*': '404'
});
