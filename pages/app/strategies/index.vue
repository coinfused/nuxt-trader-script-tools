
<template>
  <b-tabs v-model="activeTab" position="is-right">
    <b-tab-item label="New">
      <section>
        <indicators-box :indicators="indicators"/>
        <conditions-box :indicators="indicators" :conditions="conditions"/>
        <positions-box :conditions="conditions" :positions="positions"/>

        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <input
              class="input"
              type="text"
              placeholder="Name"
              v-model="name"
            >
          </p>
          <p class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Description"
              v-model="description"
            >
          </p>
          <p class="control">
            <a class="button is-link is-outlined" @click="saveStrategy">Save</a>
          </p>
        </div>
      </section>
    </b-tab-item>
    <b-tab-item label="Mine"></b-tab-item>

    <b-tab-item label="Shared"></b-tab-item>

    <b-tab-item label="Public"></b-tab-item>
  </b-tabs>
</template>



<script>
import indicatorsBox from '~/components/app/strategies/new/indicatorsBox'
import conditionsBox from '~/components/app/strategies/new/conditionsBox'
import positionsBox from '~/components/app/strategies/new/positionsBox'

export default {
  components: {
    'indicators-box': indicatorsBox,
    'conditions-box': conditionsBox,
    'positions-box': positionsBox
  },
  data() {
    return {
      activeTab: 0,
      indicators: [],
      conditions: [],
      positions: [],
      name: null,
      description: null
    }
  },
  methods: {
    saveStrategy: function() {
      return 'foo'
    }
  }
}
</script>
