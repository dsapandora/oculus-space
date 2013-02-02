// Generated by CoffeeScript 1.4.0
(function() {
  var App;

  App = {};

  App.metagames = [];

  App.players = [];

  App.minigames = [];

  App.Metagame = (function() {

    function Metagame() {
      this.id = 2;
    }

    Metagame.prototype.url = function() {
      return "/" + this.id;
    };

    Metagame.prototype.isAcceptingPlayers = function() {
      return true;
    };

    Metagame.prototype.serverInit = function(io) {
      var _this = this;
      return this.room = io.of("/" + this.id).on('connection', function(socket) {
        socket.on('player added', function(data) {
          socket.broadcast.emit('player added', data);
          if (true) {
            return _this.loadFirstGame(socket);
          }
        });
        return socket.on('load minigame - done', function(data) {
          var player, _i, _len, _ref;
          _ref = _this.players;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            player = _ref[_i];
            if (player.id === data.player.id) {
              player.ready = true;
              break;
            }
          }
          if (_this.allPlayersReady()) {
            return _this.start(socket);
          }
        });
      });
    };

    Metagame.prototype.allPlayersReady = function() {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (!player.ready) {
          return false;
        }
      }
      return true;
    };

    Metagame.prototype.start = function() {
      socket.broadbase.emit('start minigame');
      return socket.emit('start minigame');
    };

    Metagame.prototype.loadFirstGame = function(socket) {
      var player, _i, _len, _ref;
      this.currentMinigame = new App.Minigame;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.ready = false;
      }
      return socket.emit('load minigame', {
        src: this.currentMinigame.src
      });
    };

    Metagame.prototype.clientInit = function(io) {
      this.socket = io.connect("/" + this.id);
      this.socket.emit('player added', {
        player: App.player.name
      });
      this.socket.on('player added', function() {
        return console.log('player added');
      });
      this.socket.on('start minigame', function() {
        return console.log('start the minigame!!!');
      });
      return this.socket.on('load minigame', function(data) {
        console.log(data);
        return $.getScript(data.src).done(function(script, textStatus) {});
      });
    };

    Metagame.prototype.loadMinigame = function(src) {
      return $.getScript(data.src).done(function(script, textStatus) {
        return this.socket.emit('load minigame - done');
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

    Minigame.prototype.src = "/assets/minigames/default.js";

    return Minigame;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = App;
  } else {
    window.App = App;
  }

}).call(this);
