import * as bfx from 'bfx-hf-indicators'

export const strict = false
export const state = () => ({
  strategies: [],
  current: {
    indicators: [],
    conditions: [],
    actions: [],
    name: null
  },

  OHLCV: ['close', 'open', 'high', 'low', 'volume'],

  timeframes: [
    {
      slug: '1m',
      seconds: 1 * 60,
      milliseconds: 1 * 60 * 1000
    },
    {
      slug: '5m',
      seconds: 5 * 60,
      milliseconds: 5 * 60 * 1000
    },
    {
      slug: '15m',
      seconds: 15 * 60,
      milliseconds: 15 * 60 * 1000
    },
    {
      slug: '30m',
      seconds: 30 * 60,
      milliseconds: 30 * 60 * 1000
    },
    {
      slug: '1h',
      seconds: 1 * 60 * 60,
      milliseconds: 1 * 60 * 60 * 1000
    },
    {
      slug: '2h',
      seconds: 2 * 60 * 60,
      milliseconds: 2 * 60 * 60 * 1000
    },
    {
      slug: '4h',
      seconds: 4 * 60 * 60,
      milliseconds: 4 * 60 * 60 * 1000
    },
    {
      slug: '1d',
      seconds: 1 * 24 * 60 * 60,
      milliseconds: 1 * 24 * 60 * 60
    },
    {
      slug: '7d',
      seconds: 7 * 24 * 60 * 60,
      milliseconds: 7 * 24 * 60 * 60
    }
  ],

  bfxs: Object.keys(bfx)
    .filter(function(el) {
      return el != 'Indicator'
    })
    .sort()
    .map(
      function(el) {
        const indi = this.bfx[el]
        let result = {
          id: indi.id,
          humanLabel: indi.humanLabel,
          label: indi.label,
          args: indi.args
        }
        return result
      },
      {
        bfx: bfx
      }
    )
})

export const getters = {
  strategies(state) {
    return state.strategies
  },
  currentStrategy(state) {
    return state.current
  },
  timeframes(state) {
    return state.timeframes
  },
  OHLCV(state) {
    return state.OHLCV
  },
  bfxs(state) {
    return state.bfxs
  }
}

export const mutations = {
  updateStrategy(state, p) {
    if (p.section == 'strategy') {
      state.current[p.target] = p.value
    } else {
      state.current[p.section][p.index][p.target] = p.value
    }
  },

  removeFromStrategy(state, p) {
    state.current[p.section].splice(p.index, 1)
  },

  newIndicator(state) {
    state.current.indicators.push({
      name: 'indicator_' + state.current.indicators.length,
      settings: {
        args: []
      },
      timeframe: null
    })
  },

  newCondition(state) {
    state.current.conditions.push({
      name: 'condition_' + state.current.conditions.length,
      leftCond: null,
      operators: null,
      rightCond: null,
      moltiplicator: null
    })
  },

  newAction(state) {
    state.current.actions.push({
      name: 'action_' + state.current.actions.length,
      direction: null,
      size: null,
      conditions: []
    })
  },

  saveStrategy(state) {
    state.strategies.push({
      name: state.current.name,
      indicators: state.current.indicators,
      conditions: state.current.conditions,
      actions: state.current.actions
    })
    state.current.name = ''
    state.current.indicators = []
    state.current.conditions = []
    state.current.actions = []
  },

  resetStrategy(state) {
    state.current.name = ''
    state.current.indicators = []
    state.current.conditions = []
    state.current.actions = []
  }
}
