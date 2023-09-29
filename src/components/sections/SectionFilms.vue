<template>
  <div>
    <p class="headline mb-4 font-weight-bold grey--text text--darken-3">Третья секция</p>
    <div class="text-left">
      <p class="title mb-3 grey--text text--darken-3">Топ 5 фильмов</p>
      <v-progress-circular v-if="!topFilms.length" indeterminate color="primary" />
      <FilmList v-else :value="topFilms" />
      <p class="title mt-5 mb-3 grey--text text--darken-3">Поиск фильмов</p>
      <v-text-field v-model="searchInput" label="Название..." variant="solo" />
      <v-progress-circular v-if="loading" indeterminate color="primary" />
      <FilmList v-else-if="element.films.length" :value="element.films" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps, ref, Ref, computed, onMounted, watch } from 'vue'
import store from '@/store'
import { FilmsSection } from '@/common/interfaces'
import { Film } from '@/common/interfaces'

import FilmList from '@/components/helpers/FilmList.vue'

const SEARCH_DELAY = 700 // ms

const props = defineProps({
  value: {
    type: Object as PropType<FilmsSection>,
    required: true
  }
})

const element = ref(props.value)
const searchInput = ref('')
const loading = ref(false)
const timer: Ref<null | number> = ref(null)
const topFilms = computed(() => store.getters.topFilms as Film[])

const clearTimer = () => {
  if (timer.value === null) return
  clearTimeout(timer.value)
  timer.value = null
}
const setTimer = () => {
  clearTimer()
  if (!searchInput.value) {
    element.value.films = []
    loading.value = false
    return
  }
  timer.value = setTimeout(findContent, SEARCH_DELAY)
  loading.value = true
}

const findContent = () => {
  clearTimer()
  if (!searchInput.value) {
    element.value.films = []
    loading.value = false
  } else {
    store.dispatch('fetchFilms', searchInput.value).then((videos: Film[]) => {
      if (videos) element.value.films = videos
      loading.value = false
    })
  }
}

watch(searchInput, setTimer)

onMounted(() => {
  store.dispatch('fetchTopFilms')
})
</script>
