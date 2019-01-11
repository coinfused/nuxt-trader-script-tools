<template>
  <div id="indicatorsBox" class="box">
    <box-hader title="Indicators" @fun="addIndicator" />

    <template v-for="(indicator, index) in indicators">
      <div class="columns" :key="index">
        <!-- Start of REMOVE and NAME column -->
        <div class="column is-2">
          <b-field grouped>
            <p class="control">
              <button class="button is-white" @click="remove(index)">
                <b-icon icon="close" size="is-small" type="is-link"></b-icon>
              </button>
            </p>
            <b-input type="hidden" :value="updateHiddenIndex(index)" />
            <b-input :placeholder="indicator.position" v-model="indicator.name" expanded />
          </b-field>
        </div>
        <!-- End of REMOVE and NAME column -->
        <div class="column is-2">
          <b-field>
            <b-select placeholder="timeframe" v-model="indicator.timeframe" :key="'timeframe'+index" expanded>
              <option
                v-for="(tf,i) in timeframes"
                :key="'timeframe'+index+i"
                :value="tf"
              >{{ tf.slug }}</option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field>
            <b-select placeholder="Indicator Types" v-model="indicator.hf" expanded>
              <option v-for="(hf,i) in hfs" :key="'hf'+index+i" :value="hf">{{ hf.label }}</option>
            </b-select>
          </b-field>

          <div class="columns is-multiline">
            <div class="column" v-for="(arg, i) in indicator.hf.args" :key="index+i+arg">
              <div class="field has-addons">
                <div class="control">
                  <button class="button is-static">{{ arg.label}}</button>
                </div>
                <div class="control is-expanded">
                  <input class="input" :placeholder="arg.default" v-model="arg.value">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import boxHeader from '~/components/app/strategies/new/boxHeader'
import { mapGetters } from 'vuex'

export default {
  components: {
    'box-hader': boxHeader
  },
  props: [
    'indicators'
  ],
  computed: {
    ...mapGetters('app/', {
      timeframes: 'timeframes/get',
      hfs: 'hfs/get',
      ohlcv: 'ohlcv/get'
    })
  },
  methods: {
    addIndicator: function() {
      this.indicators.push({
        position: null,
        name: null,
        hf: {
          args: []
        },
        timeframe: null
      })
    },
    remove: function(index) {
      this.indicators.splice(index, 1)
    },
    updateHiddenIndex: function(index){
      this.indicators[index].position = 'indicator_' + (index+1)
    }
  }
}
</script>

<style>
</style>
