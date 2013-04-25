var t = Template.join

t.helpers({
  roomId: function() { return Session.get('currentRoomId'); },
})

t.events({
  'click button.load' : function () {
  	  Session.set('sessionId', $('input#sessionId').val());
  }
});