<template>
  <div class="container">
    <top-bar/>
    <nuxt/>
  </div>
</template>

<script>
import topBar from '~/components/topbar'

export default {
  components: {
    'top-bar': topBar,
  },
  head() {
    return {
      title: this.$route.name
    }
  }
}
</script>