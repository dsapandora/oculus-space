// Generated by CoffeeScript 1.4.0
(function() {
  var minigame, _i, _len, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Metagame = (function() {

    function Metagame(id) {
      this.id = id;
      this.minigameLoad = __bind(this.minigameLoad, this);

      this.drawPlayerList = __bind(this.drawPlayerList, this);

      this.init = __bind(this.init, this);

      this.getPlayer = __bind(this.getPlayer, this);

    }

    Metagame.prototype.getPlayer = function(id) {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.id === id) {
          return player;
        }
      }
      return null;
    };

    Metagame.prototype.minigames = [];

    Metagame.prototype.init = function(io, name) {
      var _this = this;
      console.log("New metagame with id " + this.id);
      this.el = $("<div>").addClass('active view').attr("id", "metagame");
      $('.active.view').removeClass('active').hide();
      $('body').append(this.el);
      this.socket = io.connect("/" + this.id);
      this.socket.emit('players: player joining', {
        name: name
      });
      console.log('sending JOINING');
      this.socket.on('players: list updated', function(players) {
        _this.players = players;
        return _this.drawPlayerList();
      });
      this.socket.on('minigame: load', this.minigameLoad);
      return this.socket.on('minigame: start', function() {
        return _this.minigames[0].instance.start();
      });
    };

    Metagame.prototype.drawPlayerList = function() {
      return this.el.html(JSON.stringify(this.players));
    };

    Metagame.prototype.minigameLoad = function(data) {
      var _this = this;
      if (this.minigames[data.name]) {
        this.currentMinigame = new this.minigames[data.name];
        return this.el.find("#instructions").html(this.currentMinigame.INSTRUCTIONS);
      } else {
        return $.getScript(data.minigame.src).done(function(script, textStatus) {
          _this.currentMinigame = new _this.minigames[data.name];
          return _this.el.find("#instructions").html(_this.currentMinigame.INSTRUCTIONS);
        });
      }
    };

    Metagame.prototype.addMinigame = function(minigame) {
      return this.minigames[minigame.NAME] = minigame;
    };

    Metagame.prototype.playerReady = function() {
      this.ready = true;
      return this.socket.emit('metagame: player ready');
    };

    return Metagame;

  })();

  _ref = App.metagame.minigames;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    minigame = _ref[_i];
    if (minigame.name === 'TapRace') {
      minigame.instance = new App.Minigames.TapRace;
    }
    ({
      gameover: function(minigame) {
        this.socket.emit('minigame: gameover', {
          score: minigame.score
        });
        return this.drawPlayerList();
      }
    });
  }

}).call(this);