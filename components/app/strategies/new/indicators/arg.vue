<template>
  <div class="field has-addons">
    <div class="control">
      <button class="button is-static">{{ e.label}}</button>
    </div>
    <div class="control is-expanded">
      <input class="input" :placeholder="e.default" v-model="arg">
    </div>
  </div>
</template>

<script>
export default {
  props: ['e', 'i', 'index'],
  computed: {
    arg: {
      get() {
        return this.e.value
      },
      set(value) {
        this.$store.commit('updateArg', {
          value: value,
          index: this.index,
          i: this.i
        })
      }
    }
  }
}
</script>

