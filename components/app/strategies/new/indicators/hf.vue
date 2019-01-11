<template>
<div class="column">
    <template v-for="(setting, settingIndex) in settings">
        <b-field class="has-addons" :key="index+settingIndex">
            <p class="control"><span class="button is-static"> {{setting.label}} </span></p>
            <b-input placeholder="size" :value="setting.detault" v-model="size"/>
        <b-field>
    </template>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['index'],
    data() {
    return {
      settings: bfx[this.$store.state.current.indicators[this.index].type].args
    }
  },
  computed: {
    keys: {
      get() {
        return this.$store.state.current.indicators[this.index].keys
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'indicators',
          target: 'keys',
          value: value,
          index: this.index
        })
      }
    },
    values: {
      get() {
        return this.$store.state.current.indicators[this.index].values
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'indicators',
          target: 'values',
          value: value,
          index: this.index
        })
      }
    }
  },
  ...mapGetters(['hfs', 'ohlcv', 'timeframes']),
  ...mapGetters(['currentStrategy', 'strategies'])
}
</script>
