var sys = require("sys"),
    actionManager_ = require("./action-manager.js");

exports.Client = function(connection) {
    
    this.conn = connection;

    //in many cases: "this" is a DOM object
    var me = this;
    this.conn.on("message", function(msg) {
        me.onMessage(msg);
    });

    this.conn.addListener("disconnect", function() {
        me.onDisconnect();
    });
}
 

exports.Client.prototype = {

    send: function(msg) {
        this.conn.send(msg);
    },

    onMessage: function(msg) {
        sys.log("Message received: " + msg);
        actionManager_.ActionManager.manageMessage(this.conn, msg);
    },

    onDisconnect: function() {
	sys.log("Connection " + this.conn.sessionId + " has closed");
    }
}

