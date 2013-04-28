  Meteor.Router.add({
  '/workbook': function(id) {
    return 'workbook';
  },
  '/join/:id': function(id) {
    Session.set('currentRoomId', id);
    return 'join';
  },
  '/lobby/:id': function(id){
    if (Session.get('currentRoomId'))
      return 'lobby'
    else
      window.location = "/join/"+id //not ideal but it will do
  },
  '/panel/:id': function(id) {
    if (Session.get('currentRoomId'))
      return 'panel'
    else
      window.location = "/join/"+id //not ideal but it will do
  },
  '/loop/:id': function(id) {
    if (Session.get('currentRoomId'))
      return 'loop'
    else
      window.location = "/join/"+id //not ideal but it will do
  },
  '/results/:id': function(id) {
    if (Session.get('currentRoomId'))
      return 'results'
    else
      window.location = "/join/"+id //not ideal but it will do
  },
  '/workbook/structure': function(){ 
    return 'workbookStructure'
  },
  '*': '404'
});
