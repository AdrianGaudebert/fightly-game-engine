/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

exports.MessageBuilder = function() {
};

exports.MessageBuilder.prototype = {

    /**
     * Create the basic structure of a message, and stringify to JSON.
     * @param type Type of message. Can be "login", "query", "data" or "action".
     * @param data Object containing data of the message.
     * @return JSON message to send.
     */
    createMessage: function(type, data) {
        var msg = {
            type: type,
            data: data
        };

        return JSON.stringify(msg);
    },

    /**
     * Create a query message, and stringify to JSON.
     * @param responseMethod Type of message we want to receive in response.
     * @param responseData Object containing data about this query.
     * @return JSON message to send.
     */
    createQuery: function(responseType, responseData) {
        var data = {};
        data.response_type = responseType;
        data.data = responseData;

        return this.createMessage("query", data);
    },

    /**
     * Create an action message, and stringify to JSON.
     * @param name Name of the action.
     * @param data Object containing data about this action.
     * @return JSON message to send.
     */
    createAction: function(name, data) {
        var actionData = {};
        actionData.name = name;
        actionData.data = data;

        return this.createMessage("action", actionData);
    },

    /**
     * Create a data message, and stringify to JSON.
     * @param method What to do with data. Can be "new", "update" or "delete".
     * @param object Name of the concerned object.
     * @param object_data Object containing data about this object.
     * @return JSON message to send.
     */
    createData: function(method, object, object_data) {
        var data = {};
        data.method = method;
        data.object = object;
        data.object_data = object_data;

        return this.createMessage("data", data);
    },

    /**
     * Authentication
     */
    createAuthenticationQuery: function() {
        return this.createQuery("login", {});
    },

    createAuthenticationData: function(username, valid) {
        var data = {};
        data.username = username;
        data.valid = valid;
        return this.createData("new", "Authentication", data);
    },

    createConfirmationData: function(object_data){
        return this.createData("new", "Player", object_data);
    },

    createJoinAction: function(){
        return this.createAction();
    },

    createGameData: function(object_data){
        return this.createData("new", "Game", object_data);
    },

};
