<template>
  <div>
    <p v-if="!fit" class="headline mb-4 font-weight-bold grey--text text--darken-3">
      Первая секция
    </p>
    <v-menu
      v-else-if="element.icon"
      v-model="showIconsList"
      location="center"
      attach
      :close-on-click="false">
      <template #activator="{ on }">
        <v-btn icon text v-on="on">
          <v-icon color="primary">{{ element.icon }}</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-btn v-for="icon in iconsList" :key="icon" icon text @click="setIcon(icon)">
          <v-icon>{{ `mdi-${icon}` }}</v-icon>
        </v-btn>
      </v-list>
    </v-menu>

    <div class="text-left">
      <p class="title mb-1 grey--text text--darken-3">Заголовок</p>
      <p v-if="!isEditingMode">{{ element.title }}</p>
      <v-text-field
        v-else
        v-model="title"
        class="pa-0 mt-0 mb-4"
        single-line
        hide-details
        dense
        outlined />
      <p class="title mb-1 grey--text text--darken-3">Контент</p>
      <p v-if="!isEditingMode">{{ element.content }}</p>
      <v-textarea
        v-else
        v-model="content"
        class="pa-0 mt-0 mb-4"
        auto-grow
        outlined
        dense
        hide-details />
    </div>
    <v-btn color="secondary" @click="switchEditingMode">
      <span v-if="!isEditingMode">Редактировать</span>
      <span v-else class="green--text text--lighten-3">Сохранить</span>
    </v-btn>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SectionsText',
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script lang="ts" setup>
import { PropType, nextTick, ref, onMounted, defineProps } from 'vue'
import { TextSection } from '@/common/interfaces'

const iconsList = [
  'plus',
  'minus',
  'star',
  'account',
  'home',
  'pen',
  'circle',
  'palette',
  'database'
]

const props = defineProps({
  value: {
    type: Object as PropType<TextSection>,
    required: true
  },
  fit: {
    type: Boolean,
    default: false
  }
})

const element = ref(props.value)

const title = ref(element.value.title)
const content = ref(element.value.content)

const isEditingMode = ref(false)
const showIconsList = ref(false)

onMounted(() => {
  nextTick(() => {
    if (props.fit && !element.value.icon) {
      element.value.icon = iconsList[Math.round(Math.random() * iconsList.length - 1)]
    }
  })
})

const switchEditingMode = () => {
  isEditingMode.value = !isEditingMode.value
  element.value.title = title.value
  element.value.content = content.value
}
const setIcon = (value: string) => {
  element.value.icon = `mdi-${value}`
  showIconsList.value = false
}
</script>
