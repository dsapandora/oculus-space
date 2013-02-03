class App.Minigames.DoubleTapRace extends App.Minigames.Default
  @NAME: 'DoubleTapRace'
  @INSTRUCTIONS: 'DoubleTapRace is a fun game. Click the buttons to move legs.'
  @TEMPLATES: "/assets/minigames/double_tap_race/templates/templates.js"
  @STYLESHEET = "/assets/minigames/double_tap_race/css/double_tap_race.css"

  init: ->
    this.score = 0
    
    $('head').append("<link rel='stylesheet' href='#{this.constructor.STYLESHEET}'>")
    $.getScript(this.constructor.TEMPLATES).done (script, textStatus) =>
      console.log "New minigame: #{this.constructor.NAME}"
      # create Minigame <div>
      this.el = $("<div>").addClass('active view').attr("id","double-tap-race-minigame")
      this.el.html _.template App.Minigames.DoubleTapRace.Templates.main_view

  start: =>
    $('body').append(this.el)
    this.render()

    that = this
    this.el.find(".btn").bind('touchstart', ->
      if $(this).hasClass "active"
        $(this).siblings(".btn").addClass "active"
        $(this).removeClass "active"
        that.score++
        that.render()
    )
    setTimeout((=> this.gameover()), 15000)

  render: =>
    $('.score').text 'Distance = ' + this.score


  gameover: =>
    App.metagame.gameover(this)

App.metagame.addMinigame App.Minigames.DoubleTapRace
