/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define(['lib/socket.io'], function (socket) {
    /**
     * Class ComManager
     *
     * @author Adrian Gaudebert - adrian@gaudebert.fr
     * @constructor
     */
    var ComManager = function(config, eventsListener) {
        this.config = config;
        this.listener = eventsListener;
        this._socket = null;

        this.init();
    };

    ComManager.prototype = {

        init: function() {
            var socket = io.connect(
                this.config.host,
                { port: this.config.port }
            );

            socket.on('connect_failed', function () {
                console.log('ERROR - Connection to the server failed');
            });
            socket.on('connect', this._onOpen.bind(this));
            socket.on('message', this._onMessage.bind(this));
            socket.on('disconnect', this._onClose.bind(this));

            socket.on('data', function () {
                console.log('On data');
            });

            this._socket = socket;
        },

        _onOpen: function() {
            console.log("ComManager.onOpen");
            this.listener.emit('connection');
        },

        _onMessage: function(msg) {
            console.log("ComManager.onMessage: " + msg);
            this.listener.emit('data', msg);
        },

        _onClose: function() {
            console.log("ComManager.onClose");
        },

        action: function (action) {
            this._socket.emit('action', action);
        },

        data: function (data) {
            console.log('Sending data request to server: ' + data);
            this._socket.emit('data', data);
        },

        send: function(message) {
            this._socket.send(message);
        },

    };

    return {
        'ComManager': ComManager
    };
});
