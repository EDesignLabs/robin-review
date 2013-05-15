  Meteor.Router.add({
  '/workbook': function() {
    return 'workbook';
  },
  '/join/:slug': function(slug) {
    Global.roomSlug = slug
    return 'join';
  },
  '/loop/:slug': function(slug) {
    if (Global.roomSlug && Global.isAdmin){
        return 'panel'
    }else if (Global.roomSlug){
      return 'loop'        
    }else{
      window.location = "/join/"+slug //not ideal but it will do
    }
      
  },
  '/results/:slug': function(slug) {
    if (Global.roomSlug)
      return 'results'
    else{
      window.location = "/join/"+slug //not ideal but it will do
    }
  },
  '/workbook/structure': function(){ 
    return 'workbookStructure'
  },
  '*': '404'
});
