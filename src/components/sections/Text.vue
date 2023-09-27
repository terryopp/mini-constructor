<template>
  <div>
    <p v-if="!fit" class="headline mb-4 font-weight-bold grey--text text--darken-3">
      Первая секция
    </p>
    <v-menu v-else-if="item.icon" v-model="showIconsList" location="center" attach>
      <template #activator="{ on }">
        <v-btn icon text v-on="on">
          <v-icon color="primary">{{ item.icon }}</v-icon>
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
      <p v-if="!isEditingMode">{{ item.title }}</p>
      <v-text-field
        v-else
        v-model="title"
        class="pa-0 mt-0 mb-4"
        single-line
        hide-details
        dense
        outlined />
      <p class="title mb-1 grey--text text--darken-3">Контент</p>
      <p v-if="!isEditingMode">{{ item.content }}</p>
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
import Vue, { PropType, nextTick } from 'vue'
import { TextSection } from '@/common/interfaces'

export default Vue.extend({
  name: 'TextSection',
  props: {
    value: {
      type: Object as PropType<TextSection>,
      required: true
    },
    fit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      item: this.value,
      title: this.value.title,
      content: this.value.content,
      isEditingMode: false,
      showIconsList: false,
      iconsList: ['plus', 'minus', 'star', 'account', 'home', 'pen', 'circle']
    }
  },
  mounted() {
    nextTick(() => {
      if (this.fit && !this.item.icon) {
        this.item.icon = 'mdi-plus'
      }
    })
  },
  methods: {
    switchEditingMode() {
      this.isEditingMode = !this.isEditingMode
      this.item.title = this.title
      this.item.content = this.content
    },
    setIcon(value: string) {
      this.item.icon = `mdi-${value}`
      this.showIconsList = false
    }
  }
})
</script>
