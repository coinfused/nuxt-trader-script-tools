export const state = () => ({
  ohlcv: [
    {
      id: 'c',
      label: 'CLOSE',
      humanLabel: 'Close'
    },
    {
      id: 'o',
      label: 'OPEN',
      humanLabel: 'Open'
    },
    {
      id: 'h',
      label: 'HIGH',
      humanLabel: 'High'
    },
    {
      id: 'l',
      label: 'LOW',
      humanLabel: 'Low'
    },
    {
      id: 'v',
      label: 'VOLUME',
      humanLabel: 'Volume'
    }
  ]
})

export const getters = {
  get: state => state.ohlcv
}
