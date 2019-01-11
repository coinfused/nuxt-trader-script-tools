<template>
    <div>
      <ul v-for="(strategy, index) in strategies" :key="'strategy_'+index">
        <li>
          <h1 class="title is-6">{{ strategy.description }}</h1>
          <h1 class="subtitle is-6">Indicators</h1>
          <p>{{ strategy.indicators }}</p>
          <h1 class="subtitle is-6">Conditions</h1>
          <p>{{ strategy.conditions }}</p>
          <h1 class="subtitle is-6">Actions</h1>
          <p>{{ strategy.actions }}</p>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['label', 'disabled'],
  computed: {
    isDisabled() {
      if (this.disabled) return 'disabled'
      else return null
    },
    strategies: {
      get() {
        return this.$store.strategies.array
      }
    }
  }
}
</script>
