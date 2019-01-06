<template>
  <div class="columns">
    <div class="column">
      <b-field grouped>
        <p class="control">
          <button class="button" @click="remove">
            <span class="icon is-small">
              <b-icon icon="close" size="is-small"></b-icon>
            </span>
          </button>
        </p>
        <b-input placeholder="Action name" v-model="name" expanded/>
      </b-field>
    </div>

    <div class="column">
      <b-field grouped>
        <b-select placeholder="Direction" v-model="direction" expanded>
          <option
            v-for="(dir,i) in ['long', 'short']"
            :key="'dir'+index+i"
            native-value="dir"
          >{{ dir }}</option>
        </b-select>
        <div class="field has-addons">
        <p class="control">
        <input class="input" size="1" placeholder="size" v-model="size"/>
        </p>
        <p class="control">
          <span class="button is-static">%</span>
        </p>
        </div>
      </b-field>
    </div>

    <div class="column is-7">
      <b-field>
        <b-taginput
          v-model="conditions"
          :data="currentStrategy.conditions || []"
          autocomplete
          field="name"
          placeholder="Select the trigging conditions"
          @typing="getFilteredTags"
          expanded
        />
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['action', 'index'],

  data() {
    return {
      isSelectOnly: true,
      filteredTags: this.conditions
    }
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.conditions.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        )
      })
    },
    remove() {
      this.$store.commit('removeFromStrategy', {
        section: 'actions',
        index: this.index
      })
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.current.actions[this.index].name
      },
      set(value) {
        this.$store.commit('updateCurrentStrategy', {
          section: 'actions',
          target: 'name',
          value: value,
          index: this.index
        })
      }
    },
    direction: {
      get() {
        return this.$store.state.current.actions[this.index].direction
      },
      set(value) {
        this.$store.commit('updateCurrentStrategy', {
          section: 'actions',
          target: 'direction',
          value: value,
          index: this.index
        })
      }
    },
    size: {
      get() {
        return this.$store.state.current.actions[this.index].size
      },
      set(value) {
        this.$store.commit('updateCurrentStrategy', {
          section: 'actions',
          target: 'size',
          value: value,
          index: this.index
        })
      }
    },
    conditions: {
      get() {
        return this.$store.state.current.actions[this.index].conditions
      },
      set(value) {
        this.$store.commit('updateCurrentStrategy', {
          section: 'actions',
          target: 'conditions',
          value: value,
          index: this.index
        })
      }
    },
    ...mapGetters(['currentStrategy'])
  }
}
</script>