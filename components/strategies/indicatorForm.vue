<template>
  <div>
    <div class="columns">
      <div class="column">
        <b-field grouped>
          <p class="control">
            <button class="button" @click="remove">
              <span class="icon is-small">
                <b-icon icon="close" size="is-small"></b-icon>
              </span>
            </button>
          </p>
          <b-input placeholder="Indicator Name" type="text" v-model="name"></b-input>
          <b-select placeholder="tf" v-model="timeframe" expanded>
            <option
              v-for="(tf,i) in timeframes"
              :key="'tf'+index+i"
              :native-value="tf"
            >{{ tf.slug }}</option>
          </b-select>
        </b-field>
      </div>

      <div class="column">
        <b-field>
          <b-select placeholder="Indicator Types" v-model="settings" expanded>
            <option
              v-for="(indi,i) in bfxs"
              :key="'bfx'+index+i"
              :value="indi"
            >{{ indi.label }} | {{ indi.humanLabel }}</option>
          </b-select>
        </b-field>

        <div class="columns is-multiline">
          <div class="column" v-for="(arg, settingIndex) in args" :key="index+settingIndex+'label'">
            <div class="field has-addons">
              <div class="control">
                <button class="button is-static">{{ arg.label}}</button>
              </div>
              <div class="control is-expanded">
                <input class="input" size="1" :placeholder="arg.default" v-model="arg.value">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as bfx from 'bfx-hf-indicators'

export default {
  props: ['indicator', 'index'],
  data() {
    return {}
  },
  computed: {
    name: {
      get() {
        return this.$store.state.current.indicators[this.index].name
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'indicators',
          target: 'name',
          value: value,
          index: this.index
        })
      }
    },
    settings: {
      get() {
        if (this.$store.state.current.indicators[this.index]) {
          return this.$store.state.current.indicators[this.index].settings
        }
        return []
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'indicators',
          target: 'settings',
          value: value,
          index: this.index
        })
      }
    },
    args: {
      get() {
        if (this.$store.state.current.indicators[this.index]) {
          return this.$store.state.current.indicators[this.index].settings.args
        }
        return []
      }
    },
    timeframe: {
      get() {
        return this.$store.state.current.indicators[this.index].timeframe
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'indicators',
          target: 'timeframe',
          value: value,
          index: this.index
        })
      }
    },
    ...mapGetters(['bfxs', 'timeframes'])
  },
  methods: {
    remove() {
      console.log(this.index)
      this.$store.commit('removeFromStrategy', {
        section: 'indicators',
        index: this.index
      })
    }
  }
}
</script>
