<template>
  <section class="section container main-content">

    <nav class="level">
      <div class="level-left">
        <h1 class="title">Indicators</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="control">
            <div class="buttons has-addons">
              <button
                v-for="(key,i) in ['BOLL', 'CCI', 'MACD', 'DMA']"
                :key="'addIndicator'+i"
                type="submit"
                @click="add('indicator', key)"
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
      <div
        class="field is-horizontal"
        :key="'indicatorForm'+index"
        :id="'indicatorForm'+index"
      >

        <div class="field-body">


          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                :value="indicator.name"
                readonly
              >
            </div>
          </div>

          <div
            class="field"
            v-for="(setting,i) in activeSettings[index]"
            :key="'indicatorName'+index+i"
          >
            <div class="field has-addons">
              <div class="control">
                <button class="button is-static">{{ setting.key }}</button>
              </div>
              <div class="control is-expanded">
                <input
                  class="input is-fullwidth"
                  type="text"
                  :placeholder="setting.default"
                  v-model.number="setting.value"
                >
              </div>
            </div>
          </div>

          <div
            class="field"
            v-for="(n) in (3 - activeSettings[index].length)"
            :key="n+activeSettings[index].length-1"
          >
            <div class="control is-expanded">
              <input
                type="text"
                disabled
                class="input"
              >
            </div>
          </div>

          <div class="field">
            <div class="control is-expanded">
              <div class="select">
                <select
                  size="1"
                  v-model="indicator.ohlcv"
                >
                  <option
                    v-for="(val,i) in ['close', 'open', 'high', 'low', 'volume']"
                    :key="'ohlcv' + index + i"
                  >{{ val }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control is-expanded">
              <div class="select">
                <select
                  size="1"
                  v-model="indicator.timeframe"
                >
                  <option disabled>timeframe</option>
                  <option
                    v-for="(tf,i) in ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '1d', '7d']"
                    :key="'timeframe'+index+i"
                  >{{ tf }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <button
              class="button"
              @click="remove('indicators', index)"
            >
              <span class="icon is-small">
                <b-icon icon="delete"></b-icon>
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>

    <nav class="level">
      <div class="level-left">
        <h1 class="title">Conditions</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field">
            <button
              class="button"
              @click="add('condition')"
            >
              <b-icon icon="plus"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </nav> 


    <template v-for="(condition,index) in conditions">
      <div
        class="field is-horizontal"
        :key="'conditionForm'+index"
      >
        <div class="field-body">

          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="name"
                v-model="condition.name"
              >
            </div>
          </div>

          <div class="field">
            <div class="control">
              <div class="select">
                <select
                  size="1"
                  v-model="condition.leftCond"
                >
                  <option disabled>Indicator</option>
                  <option
                    v-for="(indicatorSlug,i) in indicatorsSlug"
                    :key="'leftCond'+index+i"
                  >{{ indicatorSlug }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <div class="select">
                <select
                  size="1"
                  v-model="condition.operator"
                >
                  <option disabled>Op</option>
                  <option
                    v-for="(operator,i) in ['>','=','<']"
                    :key="'operator'+index+i"
                  >{{ operator }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="field has-addons">
              <div class="control">
                <div class="select">
                  <select
                    size="1"
                    v-model="condition.rightCond"
                  >
                    <option disabled>Indicator</option>
                    <option
                      v-for="(indicatorSlug, i) in indicatorsSlug"
                      :key="'rightCond'+index+i"
                    >{{ indicatorSlug }}</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="moltiplicator"
                  v-model.number="condition.modifier"
                >
              </div>
            </div>
          </div>

          <div class="field">
            <button
              class="button"
              @click="remove('conditions', index)"
            >
              <span class="icon is-small">
                <b-icon icon="delete"></b-icon>
              </span>
            </button>
          </div>

        </div>
      </div>
    </template>

    <nav class="level">
      <div class="level-left">
        <h1 class="title">Aggregated Conditions</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field">
            <button
              class="button"
              @click="add('group')"
            >
              <b-icon icon="plus"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <template v-for="(group,index) in groups">
      <div
        class="field is-horizontal"
        :key="'groupForm'+index"
      >
        <div class="field-body">

          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="name"
                v-model="group.name"
              >
            </div>
          </div>

          <div class="field">
            <div class="control">
              <template v-for="(condition,i) in conditions">
                <label
                  class="checkbox"
                  :key="'group'+index+i"
                >
                  <input
                    v-model="group.conditions"
                    type="checkbox"
                    :key="'group'+index+i"
                    :value='condition.name'
                  >{{ condition.name }}
                </label>
              </template>
            </div>
          </div>

          <div class="field">
            <button
              class="button"
              @click="remove('groups', index)"
            >
              <span class="icon is-small">
                <b-icon icon="delete"></b-icon>
              </span>
            </button>
          </div>

        </div>
      </div>
    </template>

    <nav class="level">
      <div class="level-left">
        <h1 class="title">Actions</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field">
            <button
              class="button"
              @click="add('action')"
            >
              <b-icon icon="plus"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </nav>

    
    <template v-for="(action,index) in actions">
      <div
        class="field is-horizontal"
        :key="'actionForm'+index"
      >
        <div class="field-body">

          <div class="field">
            <div class="control is-expanded">
              <div class="select">
                <select
                  size="1"
                  v-model="action.direction"
                >
                  <option disabled>direction</option>
                  <option
                    v-for="(dir,i) in ['long', 'short']"
                    :key="'direction'+index+i"
                  >{{ dir }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="size"
                v-model.number="action.size"
              >
            </div>
          </div>

          <div class="field">
            <div class="control">
              <template v-for="(condition,i) in conditions.concat(groups)">
                <label
                  class="checkbox"
                  :key="'group'+index+i"
                >
                  <input
                    v-model="action.conditions"
                    type="checkbox"
                    :key="'action'+index+i"
                    :value="condition.name"
                  >{{ condition.name }}
                </label>
              </template>
            </div>
          </div>

          <div class="field">
            <button
              class="button"
              @click="remove('actions', index)"
            >
              <span class="icon is-small">
                <b-icon icon="delete"></b-icon>
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
  data() {
    return {
      indicators: [],
      conditions: [],
      groups: [],
      actions: []
    }
  },

  methods: {

    add(section, name) {
      if (section == 'indicator') this.addIndicator(name)
      else if (section == 'condition') this.addCondition()
      else if (section == 'group') this.addGroup()
      else if (section == 'action') this.addAction()
    },

    addIndicator(name) {
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
        ohlcv: 'close',
        timeframe: 'timeframe',
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
      indicator.slug =
        indicator.name +
        '(' +
        indicator.ohlcv +
        ',' +
        indicator.settings
          .map(function(obj, index) {
            return obj.value || obj.default
          }, {})
          .join(',') +
        ').' +
        indicator.timeframe
      this.indicators.push(indicator)
    },

    addCondition() {
      let condition = {
        leftCond: 'Indicator',
        operator: 'Op',
        rightCond: 'Indicator',
      }
      this.conditions.push(condition)
    },

    addGroup() {
      this.groups.push({name: '', conditions: []})
    },

    addAction() {
      let action = {
        direction: "direction",
        size: 0,
        conditions: []
      }
      this.actions.push(action)
    },

    remove(arr, index) {
      this[arr].splice(index, 1)
    }
  },

  computed: {
    activeSettings: function() {
      return this.indicators.map(function(indicator, index) {
        return indicator.settings.filter(function(setting) {
          return setting.key
        })
      })
    },
    indicatorsSlug: function() {
      return this.indicators.map(function(indicator, index) {
        return (
          indicator.name +
          '(' +
          indicator.ohlcv +
          ',' +
          indicator.settings
            .map(function(obj, index) {
              return obj.value || obj.default
            }, {})
            .join(',') +
          ').' +
          indicator.timeframe
        )
      })
    }
  }
}
</script>
