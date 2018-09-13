const timer = (state={
  min: '00',
  sec: '00',
  active: false,
  interval: {
    type: null,
    duration: 0
  }
}, action) => {
  switch (action.type) {
    case 'HANDLE_PLAY_AND_PAUSE_TIMER':
      return { ...state, active: action.active }
      break;
    case 'SET_INTERVAL_TYPE':
      return { ...state, active: true, interval: action.interval }
      break;
    case 'RESET_TIMER':
      return action.timer
      break;
    default:
      return state
  }
}

export default timer
