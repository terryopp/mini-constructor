<template>
  <div>
    <p class="headline mb-4 font-weight-bold grey--text text--darken-3">Вторая секция</p>
    <draggable
      v-model="element.components"
      draggable=".item"
      class="d-flex justify-start flex-wrap item--container"
      animation="200"
      :disabled="!canDrag"
      @start="setDragging(true)"
      @end="setDragging(false)">
      <v-card
        v-for="textElement in element.components"
        :key="textElement.id"
        class="item pa-2"
        color="grey lighten-4"
        outlined>
        <v-btn icon text class="delete-element" small @click="deleteElement(textElement.id)">
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
        <TextComponent :value="textElement" :fit="true" />
      </v-card>
      <div slot="footer" class="order-last d-flex align-center">
        <v-btn text color="primary" @click="addTextElement">Добавить карточку</v-btn>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps, ref } from 'vue'
import Draggable from 'vuedraggable'
import { SectionType } from '@/common/enums'
import { CardsSection, TextSection } from '@/common/interfaces'
import { createSection } from '@/common/functions'
import TextComponent from '@/components/sections/Text.vue'

const props = defineProps({
  value: {
    type: Object as PropType<CardsSection>,
    required: true
  }
})

const element = ref(props.value)
const isDragging = ref(false)
const canDrag = ref(false)
const setCanDrag = (value: boolean) => {
  if (isDragging.value) return
  canDrag.value = value
}

const setDragging = (value: boolean) => {
  isDragging.value = value
}

const addTextElement = () => {
  element.value.components.push({
    ...createSection(SectionType.Text),
    icon: 'mdi-plus'
  } as TextSection)
}
const deleteElement = (id: string) => {
  element.value.components = element.value.components.filter(textElement => textElement.id !== id)
}
</script>

<style scoped lang="sass">
.item
  height: fit-content
  max-width: 20%
  &--container
    gap: 0.5em
</style>
