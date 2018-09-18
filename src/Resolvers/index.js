'use strict'

export const defaults = {
  timer: {
    __typename: 'Timer',
    type: null,
    duration: 0,
    active: false,
    minutes: 0,
    seconds: 0,
    uid: null
  }
}

export const resolvers = {
  Mutation: {
    saveTimer: (_, { timer }, { cache }) =>   {
      const { type, duration, active, minutes, seconds, uid } = timer
      const data = { timer: { __typename: 'Timer', type, duration, active, minutes, seconds, uid } }
      cache.writeData({ data })
      return data
    },
    timerPlay: (_, { active }, { cache }) => {
      const data = { timer: { __typename: 'Timer', active } }
      cache.writeData({ data })
      return null
    },
    timerPause: (_, { active }, { cache }) => {
      const data = { timer: { __typename: 'Timer', active } }
      cache.writeData({ data })
      return null
    },
    changeLocalTimerType: (_, { type }, { cache }) => {
      const data = { timer: { __typename: 'Timer', type } }
      cache.writeData({ data })
      return null
    }
  },
}
