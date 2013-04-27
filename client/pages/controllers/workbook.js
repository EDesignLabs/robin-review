

var t = Template.workbook


t.helpers({
	structures: function(){return Structures.find({workbookSlug: Session.get("workbookSlug")});},
	workbookSlug: function(){return Session.get('workbookSlug')},
	prettyPrintStructure: function(slug){
		return ActivityManifest[slug]
	}
})

t.events = {
	"click #load": function (){
		Session.set('workbookSlug', $('input').val())
	},
	"click #add": function(){
		Meteor.Router.to('/workbook/structure');
	},
	"click button.edit": function(){
		Session.set('structureId', this._id)
		Meteor.Router.to('/workbook/structure');
	},
	"click button.remove": function(){
		Structures.remove({_id:this._id})
	}

	
};


/*
	Template.rooms.events = {
		"click #addRoom": function (){
			var roomName = window.prompt("Name the room", "My room") || "Anonymous Room";
			if(roomName) {
				Rooms.insert({"name": roomName});
			}
		}
	};
	
	Template.main.currentRoom = function (){
		return Session.get("room") || false;
	};
	
	Template.rooms.availableRooms = function (){
		return Rooms.find({});
	};
	
	Template.roomItem.events = {
		"click .enter": function (){
			var name;
			if(Session.get("name") === undefined) {
				name = window.prompt("Your name", "Guest") || "Jerky";
				Session.set("name", name);
			}
			Session.set("room", this._id);
		},
		 "click .delete": function (){
			Rooms.remove({_id:this._id});
		}
	};
	
	Template.room.roomName = function (){
		 var room = Rooms.findOne({_id: Session.get("room")});
		 return room && room.name ;
	};
	
	Template.room.messages = function (){
		return Messages.find({room: Session.get("room")});
	};
	
	Template.messageItem.authorClass = function (){
		return Session.equals("name", this.author) ? ' mine' : '';
	};
	
	Template.room.events = {
		"click #leave": function (){
			if(!window.confirm("Leave this room?", "Do you really want to leave?")) { return; }
			Session.set("room", undefined);
		},
		"submit": function (){
			var $msg  = $("#msg");
			if ($msg.val()){
				Messages.insert({
					"room": Session.get("room"),
					"author": Session.get("name"),
					"text": $msg.val(),
					"timestamp": (new Date()).toUTCString()
				});
			}
			$msg.val("");
			$msg.focus();
			Meteor.flush()
			$("#messages").scrollTop(99999);
		}
	};

*/