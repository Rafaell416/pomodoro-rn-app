export const handlePlayAndPauseTimer = (active) => ({
  type: 'HANDLE_PLAY_AND_PAUSE_TIMER',
  active
})

export const setIntervalType = (interval) => ({
  type: 'SET_INTERVAL_TYPE',
  interval
})

export const resetTimer = (timer) => ({
  type: 'RESET_TIMER',
  timer
})
