exports.ActionManager = function() { };

exports.ActionManager.parseMessage = function(msg){
    return JSON.parse(msg);
}

exports.ActionManager.manageMessage = function(connection, msg) {
    var objectJSON = exports.ActionManager.parseMessage(msg);

    if(objectJSON.action == "login") {
        //create a new player whose username is objectJSON.params.name
	connection.send("Hi " + objectJSON.params.name);
    }
    else if(objectJSON.action == "logout") {
        //closed connection
        connection.send("Goodbye " + objectJSON.params.name);
        //connection.close();
    }
    else {
        //play game: move,...
        exports.ActionManager.playGame(connection, objectJSON);
    }
}


exports.ActionManager.playGame = function(conn, objectJSON) {    

    //check action with rule base

    //excute action (return JSON message)
    console.log(conn.sessionId + " play: " + objectJSON.action + " "
        + objectJSON.params.direction + " "
        + objectJSON.params.distance + "cells");
}


exports.ActionManager.moveLeft = function() {

}

exports.ActionManager.moveRight = function() {

}

exports.ActionManager.moveUp = function() {

}

exports.ActionManager.moveDown = function() {

}

