import * as bfx from 'bfx-hf-indicators'

export const state = () => ({
  hfs: Object.keys(bfx)
    .filter(el => {
      return el != 'Indicator'
    })
    .sort()
    .map(el => {
      const hf = bfx[el]
      return {
        id: hf.id,
        humanLabel: hf.humanLabel,
        label: hf.label,
        args: hf.args,
        ui: hf.ui
      }
    })
})

export const getters = {
  get: state => state.hfs
}
