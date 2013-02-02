// Generated by CoffeeScript 1.4.0
(function() {
  var App;

  App = {};

  App.metagames = [];

  App.players = [];

  App.Metagame = (function() {

    function Metagame() {
      this.id = 1;
    }

    Metagame.prototype.url = function() {
      return "/" + this.id;
    };

    Metagame.prototype.isAcceptingPlayers = function() {
      return true;
    };

    Metagame.prototype.serverInit = function(io) {
      return this.room = io.of("/" + this.id).on('connection', function(socket) {
        return socket.emit('player added');
      });
    };

    Metagame.prototype.clientInit = function(io) {
      this.socket = io.connect("/" + this.id, {
        name: 'kyle'
      });
      return this.socket.on('player added', function() {
        return console.log('player added');
      });
    };

    return Metagame;

  })();

  App.Player = (function() {

    function Player(name) {
      this.name = name;
    }

    return Player;

  })();

  App.Minigame = (function() {

    function Minigame() {}

    return Minigame;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = App;
  } else {
    window.App = App;
  }

}).call(this);