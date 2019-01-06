<template>
  <div class="field is-grouped">
    <div class="control">
      <b-field label="Start Date">
        <b-datepicker placeholder="Click to select..." :min-date="fromMin" :max-date="fromMax"></b-datepicker>
      </b-field>
    </div>
    <div class="control">
      <b-field label="End Date">
        <b-datepicker placeholder="Click to select..." :min-date="toMin" :max-date="toMax"></b-datepicker>
      </b-field>
    </div>
  </div>
</template>

<script>
module.export = {
  data: function() {
    return {
      fromMin: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 5
      ),
      fomMax: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 5
      ),
      toMin: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 5
      ),
      toMax: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 5
      )
    }
  }
}
</script>