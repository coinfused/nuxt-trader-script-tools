<template>
<div class="field is-expanded">
  <div class="field has-addons">
    <div v-if="isEnabled" class="control">
      <button class="button is-static">{{ key }}</button>
    </div>
    <div class="control is-expanded">
      <input
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        class="input is-fullwidth"
      >
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ['settings','keys', 'i'],
  data() {
    return {
      key: this.keys[this.i],
      placeholder: this.settings[this.keys[this.i]],
      disabled: (!this.keys[this.i]) ? true : false
    }
  },
  computed: {
    isEnabled: function() {
      return this.keys[this.i]
    }
  }
}

</script>

<style>
</style>
