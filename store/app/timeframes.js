export const state = () => ({
  timeframes: [{
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
  ]
})

export const getters = {
  get: state => state.timeframes
}
