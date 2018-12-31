<template>
  <section class="section container main-content">
    <nav class="level">
      <div class="level-left">
      </div>
      <div class="level-right">
        <div class="level-item">
          <div id="indicators-list" class="control">
            <div class="buttons has-addons">
              <button
                v-for="key in defaultIndicatorsList"
                :key="key"
                type="submit"
                @click="add(key)"
                :value="key"
                class="button is-narrow"
              >
                <span>{{ key }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <template v-for="(indicator,index) in indicators">
      <div class="field is-horizontal" :key="index" :id="index">
        <div class="field-label is-normal">
          <label class="label">{{ indicator.name }}</label>
        </div>

        <div class="field-body">
          <div class="field" v-for="(setting,i) in activeSettings[index]" :key="i" :id="i" :name="setting.button">
            <div class="field has-addons">
              <div class="control">
                <button class="button is-static">{{ setting.button }}</button>
              </div>
              <div class="control is-expanded">
                <input type="text" :placeholder="setting.placeholder" class="input is-fullwidth">
              </div>
            </div>
          </div>

          <div class="field" v-for="(n) in  (3 - activeSettings[index].length)" :key="n+activeSettings[index].length-1" :id="n+activeSettings[index].length-1">
            <div class="control is-expanded">
              <input type="text" disabled class="input">
            </div>
          </div>

          <div class="field">
            <div class="control is-expanded">
              <div class="select">
                <select size="1">
                  <option v-for="(val) in ohlcv" :key="val" :value="val" :name="ohlcv">{{ val }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control is-expanded">
              <div class="select">
                <select size="1">
                  <option selected="true" disabled="true">timeframe</option>
                  <option v-for="(tf) in timeframes" :key="tf" :value="tf" name="timeframe">{{ tf }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <button class="button" @click="remove(index)">
              <span class="icon is-small">
                <i class="fa-trash-alt" aria-hidden="true"/>
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  data(context) {
    return {
      ohlcv: ['close', 'open', 'high', 'low', 'volume'],
      timeframes: ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '1d', '7d'],
      defaultIndicatorsList: ['BOLL', 'CCI', 'MACD', 'DMA'],
      indicators: []
    }
  },

  methods: {
    add(name) {
      let indicatorsDefault = {
        BOLL: { periods: 20, sdn: 2 },
        CCI: { periods: 26 },
        DMA: { fast: 10, slow: 50 },
        DMI: { periods: 14 },
        SMA: { periods: 30 },
        EMA: { periods: 30 },
        MACD: { fast: 12, slow: 26, signal: 9 },
        MTM: { periods: 9 },
        ROC: { periods: 12 },
        RSI: { periods: 14 },
        TRIX: { periods: 12 }
      }

      let settings = indicatorsDefault[name]
      let keys = Object.keys(settings)
      let placeholders = keys.map(
        function(key) {
          return settings[key]
        },
        { settings: settings }
      )

      let i = 0
      let indicator = { name: name, settings: [] }

      while (i <= 2) {
        indicator.settings.push({
          button: keys[i] ? keys[i] : null,
          placeholder: placeholders[i] ? placeholders[i] : null
        })
        i++
      }
      this.indicators.push(indicator)
    },

    remove(index) {
      this.indicators.splice(index, 1)
    }
  },

  computed: {
    activeSettings: function() {
      return this.indicators.map(function(indicator, index) {
        return indicator.settings.filter(function(setting) {
          return setting.button
        })
      })
    }
  }
}
</script>
