<template>
  <div class="pb-12">
    <draggable
      v-model="sectionsList"
      draggable=".selection-field__container__item"
      class="d-flex flex-column justify-start pa-4 mx-auto selection-field__container"
      animation="300"
      :disabled="!canDrag"
      @start="setDragging(true)"
      @end="setDragging(false)">
      <v-card
        v-for="element in sectionsList"
        :key="element.id"
        class="selection-field__container__item pa-4">
        <v-btn
          icon
          class="delete-element"
          color="red lighten-1"
          :small="$vuetify.breakpoint.sm"
          :x-small="$vuetify.breakpoint.xs"
          @click="deleteSection(element.id)">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          class="drag-element"
          color="grey darken-2"
          :small="$vuetify.breakpoint.sm"
          :x-small="$vuetify.breakpoint.xs"
          @mouseenter="setCanDrag(true)"
          @mouseleave="setCanDrag(false)">
          <v-icon>mdi-drag</v-icon>
        </v-btn>
        <component :is="getSectionComponent(element.type)" :value="element" />
      </v-card>
    </draggable>
    <v-btn
      text
      plain
      large
      class="selection-field__add-button secondary"
      color="white"
      width="100%"
      @click="switchShowNewSlots">
      Добавить секцию
    </v-btn>
    <v-bottom-sheet v-model="showNewSlotsButtons">
      <div class="d-flex justify-center primary">
        <v-btn
          v-for="newSection in newSectionsType"
          :key="newSection.value"
          text
          x-large
          color="white"
          @click="addSection(newSection.value)">
          {{ newSection.name }}
        </v-btn>
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, watch } from 'vue'
import Draggable from 'vuedraggable'
import { SectionType } from '@/common/enums'
import { Section } from '@/common/types'
import { createSection } from '@/common/functions'

import TextComponent from '@/components/sections/SectionText.vue'
import CardsComponent from '@/components/sections/SectionCards.vue'
import FilmsComponent from '@/components/sections/SectionFilms.vue'

const newSectionsType = [
  { name: 'Текст', value: SectionType.Text },
  { name: 'Карточки', value: SectionType.Cards },
  { name: 'Фильмы', value: SectionType.Films }
]

const saveID = 'savedProject'

const showNewSlotsButtons = ref(false)

const switchShowNewSlots = (value: boolean) => {
  showNewSlotsButtons.value = value
}

const isDragging = ref(false)
const canDrag = ref(false)

const setCanDrag = (value: boolean) => {
  if (isDragging.value) return
  canDrag.value = value
}

const setDragging = (value: boolean) => {
  isDragging.value = value
}

const sectionsList: Ref<Section[]> = ref([])

const addSection = (type: SectionType) => {
  if (showNewSlotsButtons.value) switchShowNewSlots(false)
  sectionsList.value.push(createSection(type))
}
const deleteSection = (id: string) => {
  sectionsList.value = sectionsList.value.filter(section => section.id !== id)
}

onMounted(() => {
  const project = localStorage.getItem(saveID)
  if (project?.length) {
    sectionsList.value = JSON.parse(project)
    return
  }
  addSection(SectionType.Text)
  addSection(SectionType.Cards)
  addSection(SectionType.Films)
})

watch(sectionsList, value => localStorage.setItem(saveID, JSON.stringify(value)), { deep: true })

const getSectionComponent = (type: SectionType) => {
  switch (type) {
    case SectionType.Cards:
      return CardsComponent
    case SectionType.Films:
      return FilmsComponent
    default:
      return TextComponent
  }
}
</script>

<style scoped lang="sass">
.selection-field
  &__container
    gap: 2em
    position: relative
    max-width: min(95vw, 1200px)

  &__add-button
    z-index: 3
    position: fixed
    bottom: 0
    left: 0
    width: 100%
</style>
