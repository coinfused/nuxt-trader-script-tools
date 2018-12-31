<template>
  <section class="section container main-content">
    <nav class="level">
      <div class="level-left">
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="control">
            <div class="buttons has-addons">
              <button
                v-for="key in ['BOLL', 'CCI', 'MACD', 'DMA']"
                :key="key"
                type="submit"
                @click="add(key)"
                :value="key"
                class="button"
              >
                <span>{{ key }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <template v-for="(indicator,index) in indicators">
      <div class="field is-horizontal" :key="index">
        <div class="field-label is-normal is-narrow">
          <label class="label">{{ indicator.name }}</label>
        </div>

        <div class="field-body">
          <div class="field" v-for="(setting,i) in activeSettings[index]" :key="i">
            <div class="field has-addons">
              <div class="control">
                <button class="button is-static">{{ setting.key }}</button>
              </div>
              <div class="control is-expanded">
                <input class="input is-fullwidth" type="text" :placeholder="setting.default" v-model.number="setting.value">
              </div>
            </div>
          </div>

          <div class="field" v-for="(n) in (3 - activeSettings[index].length)" :key="n+activeSettings[index].length-1">
            <div class="control is-expanded">
              <input type="text" disabled class="input">
            </div>
          </div>

          <div class="field">
            <div class="control is-expanded">
              <div class="select">
                <select size="1" v-model="indicator.ohlcv">
                  <option v-for="(val) in ['close', 'open', 'high', 'low', 'volume']" :key="val" :value="val">{{ val }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control is-expanded">
              <div class="select">
                <select size="1" name="timeframe" v-model="indicator.timeframe">
                  <option selected="true" disabled="true">timeframe</option>
                  <option v-for="(tf) in ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '1d', '7d']" :key="tf" :value="tf">{{ tf }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <button class="button" @click="remove(index)" name="removeIndicator" :id="'remove'+index">
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
      let indicator = {
        name: name,
        ohlcv: "close",
        timeframe: "timeframe",
        settings: []
      }

      while (i <= 2) {
        if (keys[i]) {
          indicator.settings.push({
            key: keys[i] ? keys[i] : null,
            default: placeholders[i] ? placeholders[i] : null,
            value: null
          })
        }
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
          return setting.key
        })
      })
    }
  }
}
</script>
