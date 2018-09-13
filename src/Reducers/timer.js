const timer = (state=[], action) => {
  switch (action.type) {
    case 'CREATE_TIMER':
      return action.timer
      break;
    case 'HANDLE_PLAY_AND_PAUSE_TIMER':
      return { ...state, active: action.active }  
      break;
    default:
      return state
  }
}

export default timer
