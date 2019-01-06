
<template>
  <section class="section container main-content">
    <no-ssr>
      <b-tabs v-model="activeTab">
        <b-tab-item label="New Strategy">
          <div id="indicatorsBox" class="box">
            <new-form title="Indicators" @fun="newIndicator"/>

            <template v-for="(indicator,index) in currentStrategy.indicators">
              <indicator-form :indicator="indicator" :index="index" :key="'indicator'+index"/>
            </template>
          </div>

          <div id="conditionsBox" class="box">
            <new-form title="Conditions" @fun="newCondition"/>

            <template v-for="(condition,index) in currentStrategy.conditions">
              <condition-form :condition="condition" :index="index" :key="'condition'+index"/>
            </template>
          </div>

          <div id="actionsBox" class="box">
            <new-form title="Actions" @fun="newAction"/>

            <template v-for="(action,index) in currentStrategy.actions">
              <action-form :action="action" :index="index" :key="'action'+index"/>
            </template>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="Strategy description" v-model="name">
            </p>
            <p class="control">
              <a class="button is-info" @click="saveStrategy">Save</a>
            </p>
          </div>
        </b-tab-item>

        <b-tab-item label="My Strategies">
          <div>
            <ul v-for="(strategy, index) in strategies" :key="'Strategy'+index">
              <li>
                <h1 class="title is-6">{{ strategy.name }}</h1>
                <p>{{ strategy.indicators }}</p>
                <p>{{ strategy.conditions }}</p>
                <p>{{ strategy.groups }}</p>
                <p>{{ strategy.actions }}</p>
              </li>
            </ul>
          </div>
        </b-tab-item>
      </b-tabs>
    </no-ssr>
  </section>
</template>


<script>
import NoSSR from 'vue-no-ssr'
import { mapGetters, mapMutations } from 'vuex'
import newForm from '../components/strategies/newForm'
import indicatorForm from '../components/strategies/indicatorForm'
import conditionForm from '../components/strategies/conditionForm'
import actionForm from '../components/strategies/actionForm'

export default {
  components: {
    'no-ssr': NoSSR,
    'new-form': newForm,
    'indicator-form': indicatorForm,
    'condition-form': conditionForm,
    'action-form': actionForm
  },
  data(context) {
    return {
      activeTab: 0
    }
  },

  methods: {
    saveStrategy() {
      this.$store.commit('saveStrategy')
    },
    ...mapMutations(['newIndicator', 'newCondition', 'newAction'])
  },

  computed: {
    name: {
      get() {
        return this.$store.state.current.name
      },
      set(value) {
        this.$store.commit('updateStrategy', {
          section: 'strategy',
          target: 'name',
          value: value,
        })
      }
    },
    ...mapGetters(['currentStrategy', 'strategies', 'OHLCV', 'timeframes'])
  }
}
</script>
