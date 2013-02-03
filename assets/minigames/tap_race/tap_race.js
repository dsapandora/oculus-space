// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Minigames.TapRace = (function(_super) {

    __extends(TapRace, _super);

    function TapRace() {
      this.start = __bind(this.start, this);
      return TapRace.__super__.constructor.apply(this, arguments);
    }

    TapRace.NAME = 'TapRace';

    TapRace.INSTRUCTIONS = 'TapRace is a fun game. Click link, plz.';

    TapRace.TEMPLATES = "/assets/minigames/tap_race/templates.js";

    TapRace.STYLESHEET = "/assets/minigames/tap_race/styles.css";

    TapRace.prototype.init = function() {
      this.currentNumber = 1;
      Array.prototype.shuffle = function() {
        return this.sort(function() {
          return 0.5 - Math.random();
        });
      };
      this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].shuffle();
      console.log(this.numbers);
      if (!(App.Templates.TapRace != null)) {
        $('head').append("<link rel='stylesheet' href='" + this.constructor.STYLESHEET + "'>");
        return $.getScript(this.constructor.TEMPLATES);
      }
    };

    TapRace.prototype.start = function() {
      var numbers, player, tds, that, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.currentNumber = 0;
      }
      this.el = $("<div>").attr({
        "id": "tap-race-minigame"
      });
      this.el.html(_.template(App.Templates.TapRace.main_view));
      numbers = this.numbers;
      tds = this.el.find("#tap-board td").each(function(i) {
        return $(this).text(numbers[i]);
      });
      this.render();
      $('body').append(this.el);
      that = this;
      return this.el.find("#tap-board td").bind("touchstart click", function() {
        if (parseInt($(this).text()) === that.currentNumber) {
          that.broadcast('player: scored', {
            number: that.currentNumber
          });
          that.currentNumber++;
          $(this).text('');
          if (that.currentNumber > 2) {
            return that.showCongrats();
          }
        }
      });
    };

    TapRace.prototype.render = function() {
      return this.el.find("#tap-race-players").html(_.template(App.Templates.TapRace.players_view, {
        players: this.players
      }));
    };

    TapRace.prototype.showCongrats = function() {
      return alert("congrats!");
    };

    TapRace.prototype.gameover = function() {
      $(this.el).fadeOut();
      return App.metagame.gameover(this);
    };

    TapRace.prototype.receiveBroadcast = function(event, data, player_id) {
      var player, rand, table, tds, _i, _len, _ref, _results;
      console.log(data);
      console.log(player_id);
      if (player_id != null) {
        _ref = this.players;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          player = _ref[_i];
          if (player.id === player_id) {
            table = this.el.find("#tap-race-players #score-table-" + player_id);
            _results.push((function() {
              var _results1;
              _results1 = [];
              while (data.number > player.currentNumber) {
                tds = table.find("td").not(".no-background");
                rand = Math.floor(Math.random() * tds.length);
                console.log(rand);
                console.log(tds.eq(rand));
                tds.eq(Math.floor(Math.random() * tds.length)).addClass('no-background');
                player.currentNumber++;
                break;
              }
              return _results1;
            })());
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    return TapRace;

  })(App.Minigames.Default);

  App.metagame.addMinigame(App.Minigames.TapRace);

}).call(this);
