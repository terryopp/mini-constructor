<template>
  <draggable
    v-model="sectionsList"
    draggable=".item"
    class="d-flex flex-column justify-start pa-4 item-container"
    animation="300"
    :disabled="!canDrag"
    @start="setDragging(true)"
    @end="setDragging(false)">
    <v-card v-for="element in sectionsList" :key="element.id" class="item pa-4">
      <v-btn icon text class="delete-element" @click="deleteSection(element.id)">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        text
        class="drag-element"
        @mouseenter="setCanDrag(true)"
        @mouseleave="setCanDrag(false)">
        <v-icon>mdi-drag</v-icon>
      </v-btn>
      <TextComponent v-if="element.type === SectionType.Text" :value="element" />
      <CardsComponent v-if="element.type === SectionType.Cards" :value="element" />
      <FilmsComponent v-if="element.type === SectionType.Films" :value="element" />
    </v-card>
    <v-menu v-model="showNewSlots" location="center" attach>
      <template #activator="{ on }">
        <v-btn slot="footer" text color="primary" class="order-last" v-on="on">
          Добавить секцию
        </v-btn>
      </template>

      <v-list>
        <v-btn
          v-for="newSection in newSectionsType"
          :key="newSection.value"
          text
          color="primary"
          @click="addSection(newSection.value)">
          {{ newSection.name }}
        </v-btn>
      </v-list>
    </v-menu>
  </draggable>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, watch } from 'vue'
import Draggable from 'vuedraggable'
import { SectionType } from '@/common/enums'
import { Section } from '@/common/types'
import { createSection } from '@/common/functions'

import TextComponent from '@/components/sections/Text.vue'
import CardsComponent from '@/components/sections/Cards.vue'
import FilmsComponent from '@/components/sections/Films.vue'

const newSectionsType = [
  { name: 'Текст', value: SectionType.Text },
  { name: 'Карточки', value: SectionType.Cards },
  { name: 'Фильмы', value: SectionType.Films }
]

const saveID = 'savedProject'

const showNewSlots = ref(false)

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
</script>

<style scoped lang="sass">
.item-container
  gap: 2em
  position: relative
  margin: 0 auto
  z-index: 2
  max-width: min(95vw, 1200px)
</style>
