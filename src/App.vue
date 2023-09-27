<template>
  <v-app>
    <v-main>
      <SectionsField />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import SectionsField from '@/components/SectionsField.vue'

export default Vue.extend({
  name: 'App',
  components: {
    SectionsField
  }
})
</script>

<style lang="sass">
@import './assets/styles/app.sass'
</style>
