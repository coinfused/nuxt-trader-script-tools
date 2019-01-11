<template>
  <div id="conditionsBox" class="box">
    <box-hader title="Conditions" @fun="addCondition"/>

    <template v-for="(condition, index) in conditions">
      <div class="columns" :key="index">
        <div class="column is-2">
          <b-field grouped>
            <p class="control">
              <button class="button is-white" @click="remove(index)">
                <b-icon icon="close" size="is-small" type="is-link"></b-icon>
              </button>
            </p>
            <b-input type="hidden" :value="updateHiddenIndex(index)"/>
            <b-input
              :placeholder="condition.position"
              :key="'name'+index"
              v-model="condition.name"
              expanded
            />
          </b-field>
        </div>

        <div class="column is-2">
          <b-field>
            <b-select
              placeholder="Left Indicator"
              v-model="condition.left"
              :key="'left'+index"
              expanded
            >
              <optgroup label="Indicators">
                <option
                  v-for="(indicator,i) in indicators"
                  :key="'left'+index+i"
                  :value="indicator"
                >{{ indicator.name || indicator.position }}</option>
              </optgroup>
              <optgroup label="ohlcv">
                <option v-for="(el,i) in ohlcv" :key="'ohlcv'+index+i">{{ el.humanLabel }}</option>
              </optgroup>
            </b-select>

            <template v-if="condition.left.hf && condition.left.hf.ui">
              <b-select placeholder="Outputs" v-if="condition.left.hf.ui.lines" expanded>
                <option
                  v-for="(line,i) in condition.left.hf.ui.lines"
                  :key="'leftline'+index+i"
                  :value="line"
                >{{ line }}</option>
              </b-select>
            </template>
          </b-field>
        </div>

        <div class="column is-2">
          <b-field>
            <b-select
              placeholder="Operator"
              v-model="condition.operator"
              :key="'operator'+index"
              expanded
            >
              <option
                v-for="(operator,i) in ['greater then', 'equal to', 'lower then']"
                :key="'operator'+index+i"
                :native-value="operator"
              >{{ operator }}</option>
            </b-select>
          </b-field>
        </div>

        <div class="column">
          <b-field>
            <b-select
              placeholder="Right Indicator"
              v-model="condition.right"
              :key="'right'+index"
              expanded
            >
              <optgroup label="Indicators">
                <option
                  v-for="(indicator,i) in indicators"
                  :key="'left'+index+i"
                  :value="indicator"
                >{{ indicator.name || indicator.position }}</option>
              </optgroup>
              <optgroup label="OHLCV">
                <option v-for="(el,i) in ohlcv" :key="'ohlcv'+index+i">{{ el.humanLabel }}</option>
              </optgroup>
              <optgroup label="Others">
                <option
                  v-for="(el,i) in [{humanLabel: 'Fix Value', id: 'fix'}]"
                  :value="el.id"
                  :key="'others'+index+i"
                >{{ el.humanLabel }}</option>
              </optgroup>
            </b-select>

            <template v-if="condition.right.hf && condition.right.hf.ui">
              <b-select placeholder="Outputs" v-if="condition.right.hf.ui.lines" expanded>
                <option
                  v-for="(line,i) in condition.right.hf.ui.lines"
                  :key="'rightline'+index+i"
                  :value="line"
                >{{ line }}</option>
              </b-select>
            </template>

            <div class="control">
              <template v-if="condition.right == 'fix'">
                <button class="button is-static">=</button>
              </template>
              <template v-else>
                <button class="button is-static">*</button>
              </template>
            </div>
            <div class="control">
              <input class="input" size="1" placeholder="1.00" v-model="condition.modifier">
            </div>
          </b-field>
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
  props: ['conditions', 'indicators'],
  computed: {
    ...mapGetters('app', {
      ohlcv: 'ohlcv/get'
    })
  },
  methods: {
    addCondition: function() {
      this.conditions.push({
        name: null,
        left: { hf: null },
        operator: null,
        right: { hf: null },
        modifier: null
      })
    },
    remove: function(index) {
      this.conditions.splice(index, 1)
    },
    updateHiddenIndex: function(index) {
      this.conditions[index].position = 'condition_' + (index + 1)
    }
  }
}
</script>

