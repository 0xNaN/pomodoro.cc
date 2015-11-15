import Timer       from './modules/Timer'
import Sounds      from './modules/Sounds'
import reduxStore  from './reduxStore'
import store       from 'store'
import {tickTimer, resumeTimer}   from './actions'

export default function init() {
  const pomodoro = store.get('pomodoro')
  reduxStore.dispatch(resumeTimer(pomodoro))

  Timer.on('tick', (remaining) => {
    Sounds.startTickingSound()
    reduxStore.dispatch(tickTimer(remaining))
  })

  Timer.on('end', () => {
    Sounds.stopTickingSound()
    Sounds.startRingingSound()
  })
}
