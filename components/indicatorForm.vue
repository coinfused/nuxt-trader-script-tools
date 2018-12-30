<template>
  <div name="indicatorForm" class="field is-horizontal">
    <div name="indicatorName" class="field-label is-normal">
      <label class="label">{{ indicator.name }}</label>
    </div>

    <div class="field-body">
      <div v-for="(n,i) in 3" :key="n" class="field">
        <Setting :settings="settings" :keys="keys" :i="i"/>
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
        <button class="button">
          <span class="icon is-small">
            <i class="fa-trash-alt" aria-hidden="true"/>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Setting from '~/components/indicatorSetting'

export default {
  components: { Setting },
  props: ['indicator'],
  data(context) {
    return {
      timeframes: ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '1d', '7d'],
      settings: this.indicator.settings,
      keys: Object.keys(this.indicator.settings),
      ohlcv: ['close','open','high','low','volume']
    }
  }
}
</script>
