<template>
  <div class="d-flex justify-space-between films-container">
    <v-card
      v-for="film in value"
      :key="film.filmId"
      class="film--container pa-4 ma-0"
      color="grey lighten-4"
      outlined>
      <img class="film--preview rounded" :src="film.posterUrl" />
      <v-container class="film--data">
        <v-row no-gutters>
          <v-col cols="10">
            <v-row no-gutters>
              <v-col>
                <p class="text-title mb-0">{{ film.nameRu }}</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <p class="text-caption">({{ film.nameEn }})</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <p class="text-h5 text-right film--data--rating">{{ film.rating }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Film } from '@/common/interfaces'

export default Vue.extend({
  name: 'FilnList',
  props: {
    value: {
      type: Array as PropType<Film[]>,
      required: true
    }
  }
})
</script>

<style scoped lang="sass">
.films-container
  gap: 0.5em
  max-width: 100%

.film
  &--container
    height: fit-content
  &--preview
    width: 100%
  &--data
    p
      margin: 0
    &--rating
      white-space: nowrap
</style>
