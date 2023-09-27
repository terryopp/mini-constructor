<template>
  <div>
    <p class="headline mb-4 font-weight-bold grey--text text--darken-3">Вторая секция</p>
    <draggable
      v-model="item.components"
      draggable=".item"
      class="d-flex justify-start flex-wrap item--container"
      animation="200"
      :disabled="!canDrag"
      @start="setDragging(true)"
      @end="setDragging(false)">
      <v-card
        v-for="element in item.components"
        :key="element.id"
        class="item pa-2"
        color="grey lighten-4"
        outlined>
        <v-btn icon text class="delete-element" small @click="deleteElement(element.id)">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          text
          class="drag-element"
          small
          @mouseenter="setCanDrag(true)"
          @mouseleave="setCanDrag(false)">
          <v-icon>mdi-drag</v-icon>
        </v-btn>
        <TextComponent :value="element" :fit="true" />
      </v-card>
      <div slot="footer" class="order-last d-flex align-center">
        <v-btn text color="primary" @click="addCard">Добавить карточку</v-btn>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Draggable from 'vuedraggable'
import { SectionType } from '@/common/enums'
import { CardsSection, TextSection } from '@/common/interfaces'
import { createSection } from '@/common/functions'
import TextComponent from '@/components/sections/Text.vue'

export default Vue.extend({
  name: 'CardsSection',
  components: {
    Draggable,
    TextComponent
  },
  props: {
    value: {
      type: Object as PropType<CardsSection>,
      required: true
    }
  },
  data() {
    return {
      item: this.value,
      isDragging: false,
      canDrag: false
    }
  },
  methods: {
    setCanDrag(value: boolean) {
      if (this.isDragging) return
      this.canDrag = value
    },
    setDragging(value: boolean) {
      this.isDragging = value
    },
    addCard() {
      this.item.components.push({
        ...createSection(SectionType.Text),
        icon: 'mdi-plus'
      } as TextSection)
    },
    deleteElement(id: string) {
      this.item.components = this.item.components.filter(card => card.id !== id)
    }
  }
})
</script>

<style scoped lang="sass">
.item
  height: fit-content
  max-width: 20%
  &--container
    gap: 0.5em
</style>
