<template>
  <div id="positionBox" class="box">
    <box-hader title="Positions" @fun="addPosition"/>

    <template v-for="(position, index) in positions">
      <div class="columns" :key="'position'+index">
        <div class="column is-2">
          <b-field grouped>
            <p class="control">
              <button class="button is-white" @click="remove(index)">
                <b-icon icon="close" size="is-small" type="is-link"></b-icon>
              </button>
            </p>
            <b-input type="hidden" :value="updateHiddenIndex(index)" />
            <b-input :placeholder="position.position" :key="index" v-model="position.name" expanded/>
          </b-field>
        </div>

        <div class="column is-2">
          <b-field grouped>
            <b-select placeholder="Position" v-model="position.direction" expanded>
              <option
                v-for="(dir,i) in ['Long', 'Short']"
                :key="'dir'+index+i"
                native-value="dir"
              >{{ dir }}</option>
            </b-select>
            <div class="field has-addons">
              <p class="control">
                <input class="input" size="1" placeholder="Size" v-model="position.size">
              </p>
              <p class="control">
                <span class="button is-static">%</span>
              </p>
            </div>
          </b-field>
        </div>

        <div class="column">
          <b-field>
            <b-taginput
              v-model="position.conditions"
              :data="filteredTags"
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
  </div>
</template>

<script>
import boxHeader from '~/components/app/strategies/new/boxHeader'
import { mapGetters } from 'vuex'

export default {
  components: {
    'box-hader': boxHeader
  },
  props: ['positions', 'conditions'],
  data() {
    return {
      isSelectOnly: true,
      filteredTags: this.conditions.map(function(el, i, s) {
        return (el.name || el.position)
      })
    }
  },
  computed: {
    conditions_length: function(){
      return this.conditions.length
    }
  },
  methods: {
    addPosition: function() {
      this.positions.push({
        name: null,
        direction: null,
        size: null,
        conditions: []
      })
    },
    remove: function(index) {
      this.positions.splice(index, 1)
    },
    updateHiddenIndex: function(index){
      this.positions[index].position = 'position_' + (index+1)
    },
    getFilteredTags(text) {
      this.filteredTags = this.conditions
        .map(function(el, i, s) {
          return (el.name || el.position)
        })
        .filter(
          function(el) {
            return (
              el
                .toString()
                .toLowerCase()
                .indexOf(this.text.toLowerCase()) >= 0
            )
          },
          { text: text }
        )
    }
  }
}
</script>