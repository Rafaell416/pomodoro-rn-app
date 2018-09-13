export const createTimer = (timer) => ({
  type: 'CREATE_TIMER',
  timer
})

export const handlePlayAndPauseTimer = (active) => ({
  type: 'HANDLE_PLAY_AND_PAUSE_TIMER',
  active
})
