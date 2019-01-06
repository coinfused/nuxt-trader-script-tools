<template>
  <div class="columns is-11">
    <div class="column is-2">
      <b-field grouped>
        <p class="control">
          <button class="button" @click="remove">
            <span class="icon is-small">
              <b-icon icon="close" size="is-small"></b-icon>
            </span>
          </button>
        </p>
        <b-input placeholder="Condition name" v-model="name" expanded/>
      </b-field>
    </div>

    <div class="column">
      <b-field>
        <b-select placeholder="Expression Left Indicator" v-model="leftCond" expanded>
          <optgroup label="Indicators">
            <option
              v-for="(indicator,i) in indicatorsNames"
              :key="'leftCondIndicator'+index+i"
              :native-value="indicator"
            >{{ indicator }}</option>
          </optgroup>
          <optgroup label="OHLCV">
            <option v-for="(el,i) in OHLCV" :key="'leftCondOHLCV'+index+i">{{ el }}</option>
          </optgroup>
        </b-select>
      </b-field>
    </div>

    <div class="column is-2">
      <b-field>
        <b-select placeholder="Operator" v-model="operators" expanded>
          <option
            v-for="(operator,i) in ['greater then', 'equal to', 'lower then']"
            :key="'operator'+index+i"
            :native-value="operator"
          >{{ operator }}</option>
        </b-select>
      </b-field>
    </div>

    <div class="column">
      <b-field class="has-addons">
        <b-select placeholder="Expression Right Indicator" v-model="rightCond" expanded>
          <optgroup label="Indicators">
            <option
              v-for="(indicator,i) in indicatorsNames"
              :key="'rightCondINDICATOR'+index+i"
              :native-value="indicator"
            >{{ indicator }}</option>
          </optgroup>
          <optgroup label="OHLCV">
            <option v-for="(el,i) in OHLCV" :key="'rightCondOHLCV'+index+i">{{ el }}</option>
          </optgroup>
        </b-select>
        <b-input placeholder="1.00" v-model="moltiplicator"/>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['condition', 'index'],
  computed: {
    name: {
      get() {
        return this.$store.state.current.conditions[this.index].name
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'conditions',
          target: 'name',
          value: value,
          index: this.index
        })
      }
    },
    leftCond: {
      get() {
        return this.$store.state.current.conditions[this.index].leftCond
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'conditions',
          target: 'leftCond',
          value: value,
          index: this.index
        })
      }
    },
    operators: {
      get() {
        return this.$store.state.current.conditions[this.index].operators
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'conditions',
          target: 'operators',
          value: value,
          index: this.index
        })
      }
    },
    rightCond: {
      get() {
        return this.$store.state.current.conditions[this.index].rightCond
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'conditions',
          target: 'rightCond',
          value: value,
          index: this.index
        })
      }
    },
    moltiplicator: {
      get() {
        return this.$store.state.current.conditions[this.index].moltiplicator
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'conditions',
          target: 'moltiplicator',
          value: value,
          index: this.index
        })
      }
    },
    indicatorsNames: {
      get() {
        return this.$store.state.current.indicators.map(function(i) {
          return i.name
        })
      }
    },
    ...mapGetters(['OHLCV', 'timeframes'])
  },
  methods: {
    remove() {
      this.$store.commit('removeFromStrategy', {
        section: 'conditions',
        index: this.index
      })
    }
  }
}
</script>

