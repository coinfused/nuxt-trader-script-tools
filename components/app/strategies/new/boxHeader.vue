<template>
  <nav class="level is-mobile">
    <div class="level-left">
      <div class="level-item">
        <button class="button is-white" @click="$emit('fun')">
          <b-icon icon="plus" size="is-small" type="is-link"></b-icon>
        </button>
      </div>
      <div class="level-item">
        <h1 class="title is-5">{{title}}</h1>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['title', 'fun']
}
</script>