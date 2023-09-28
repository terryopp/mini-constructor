<template>
  <div class="d-flex justify-space-between films-container">
    <v-card
      v-for="film in value"
      :key="film.filmId"
      class="film--container pa-4 ma-0"
      color="grey lighten-4"
      outlined>
      <img class="film--preview rounded" :src="film.posterUrl" />
      <div class="d-flex justify-space-between">
        <div>
          <p class="text-title film--data--name">{{ film.nameRu }}</p>
          <p class="text-caption grey--text text--darken-1 film--data--name">({{ film.nameEn }})</p>
        </div>
        <p class="text-h5 text-right film--data--rating shrink-0 ml-2">
          {{ film.rating }}
        </p>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue'
import { Film } from '@/common/interfaces'

defineProps({
  value: {
    type: Array as PropType<Film[]>,
    required: true
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
    &--name,
    &--rating
      margin: 0
    &--rating
      white-space: nowrap
</style>
