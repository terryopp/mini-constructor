<template>
  <draggable
    v-model="sections"
    draggable=".item"
    class="d-flex flex-column justify-start pa-4 item-container"
    animation="300"
    :disabled="!canDrag"
    @start="setDragging(true)"
    @end="setDragging(false)">
    <v-card v-for="element in sections" :key="element.id" class="item pa-4">
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
      <TextComponent v-if="isTextComponent(element.type)" :value="element" />
      <CardsComponent v-if="isCardsComponent(element.type)" :value="element" />
      <FilmsComponent v-if="isFilmsComponent(element.type)" :value="element" />
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

<script lang="ts">
import Vue from 'vue'
import Draggable from 'vuedraggable'
import { SectionType } from '@/common/enums'
import { Section } from '@/common/types'
import { createSection } from '@/common/functions'

import TextComponent from '@/components/sections/Text.vue'
import CardsComponent from '@/components/sections/Cards.vue'
import FilmsComponent from '@/components/sections/Films.vue'

export default Vue.extend({
  name: 'SectionsField',
  components: {
    Draggable,
    TextComponent,
    CardsComponent,
    FilmsComponent
  },
  data: () => ({
    sectionsList: [] as Section[],
    showNewSlots: false,
    newSectionsType: [
      { name: 'Текст', value: SectionType.Text },
      { name: 'Карточки', value: SectionType.Cards },
      { name: 'Фильмы', value: SectionType.Films }
    ],
    isDragging: false,
    canDrag: false
  }),
  computed: {
    sections: {
      get() {
        return this.sectionsList
      },
      set(value: Section[]) {
        this.sectionsList = value
      }
    }
  },
  mounted() {
    this.addSection(SectionType.Text)
    this.addSection(SectionType.Cards)
    this.addSection(SectionType.Films)
  },
  methods: {
    isTextComponent: (type: SectionType) => type === SectionType.Text,
    isCardsComponent: (type: SectionType) => type === SectionType.Cards,
    isFilmsComponent: (type: SectionType) => type === SectionType.Films,
    setCanDrag(value: boolean) {
      if (this.isDragging) return
      this.canDrag = value
    },
    setDragging(value: boolean) {
      this.isDragging = value
    },
    addSection(type: SectionType) {
      this.sections.push(createSection(type))
    },
    deleteSection(id: string) {
      this.sections = this.sections.filter(section => section.id !== id)
    }
  }
})
</script>

<style scoped lang="sass">

.item-container
  gap: 2em
  position: relative
  z-index: 2
</style>
