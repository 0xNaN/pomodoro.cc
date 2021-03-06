var React = require('react')
  , TimeFormatter = require('../modules/TimeFormatter')
  , Timer = require('../modules/Timer')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      time: TimeFormatter.formatSeconds(Timer.getRemaining()),
      disabled25: false,
      disabled15: false,
      disabled5: false,
      startedAt: 0
    }
  },
  componentWillUnmount: function(){
    Timer.off('tick', this._tick)
    Timer.off('end', this._end)
  },
  componentDidMount: function() {
    Timer.on('tick', this._tick)
    Timer.on('end', this._end)

    if( !Timer.isInProgress() ) {
      return
    }

    var canRestoreMinutes = this.props.data && /(5|15|25)/.test(this.props.data.minutes)

    if( canRestoreMinutes ){
      var newState = {disabled25: true, disabled15: true,disabled5: true}
      newState['disabled'+this.props.data.minutes] = false
      this.setState(newState)
    }
  },
  _disableButtons: function(){
    this.setState({disabled25: true, disabled15: true, disabled5: true })
  },
  _enableButtons: function(){
    this.setState({disabled25: false, disabled15: false, disabled5: false })
  },
  _tick: function(){
    if( !this.isMounted() )
      return
    var remaining = Timer.getRemaining()
    var time = TimeFormatter.formatSeconds(remaining)
    this.setState({
      time: time,
    })
    if( remaining <= 0 ){
      this._stop()
      if( this.props.notify ){
        this.props.notify('end', this.minutes, this.type)
      }
    }
  },
  _startStop: function(minutes, type){
    return function(){
      var eventName = Timer.isInProgress() ? 'end' : 'start'
      if( this.props.notify ){
        this.props.notify(eventName, minutes, type)
      }

      this[eventName === 'start' ? '_start' : '_stop'](minutes, type)
    }.bind(this)
  },
  _start: function(minutes, type){
    if( Timer.isInProgress() ){
      return
    }
    Timer.start(minutes*60)
    this.minutes = minutes
    this.type = type
    this._disableButtons()
    var disabledMinutes = {}
    disabledMinutes['disabled'+minutes] = false
    this.setState(disabledMinutes)
  },
  _stop: function(minutes, type){
    Timer.stop()
    this._end()
  },
  _end: function(){
    this._enableButtons()
    this.setState({
      time: TimeFormatter.formatSeconds(Timer.getRemaining())
    })
  },
  render: function(){
    return  <div className="pomodoro">
              <div className="timer">{this.state.time}</div>
              <div className="control-buttons-container">
                <button disabled={this.state.disabled25} onClick={this._startStop(25,"pomodoro")}>
                  <i className="icon pomodoro"></i>
                  <span>&nbsp; 25 min</span>
                </button>
                <button disabled={this.state.disabled5} onClick={this._startStop(5,"break")}>
                  <i className="icon ion-pause"></i>
                  <span>&nbsp; 5 min</span>
                </button>
                <button disabled={this.state.disabled15} onClick={this._startStop(15,"break")}>
                  <i className="icon ion-pause"></i>
                  <span>&nbsp; 15 min</span>
                </button>
              </div>
            </div>
  }
})
