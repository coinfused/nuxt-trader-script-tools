<template>
  <nav class="level">
    <div class="level-left">
<div class="level-item">
          <button class="button" @click="$emit('fun')">
            <b-icon icon="plus" size="is-small"></b-icon>
          </button>
</div>
      <div class="level-item">
        <h1 class="title is-5">{{title}}</h1>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['title', 'fun']
}
</script>
