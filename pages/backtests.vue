<template>
  <div>{{ name }}</div>
</template>

<script>
export default {
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  }
}
</script>
