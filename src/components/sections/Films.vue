<template>
  <div>
    <p class="headline mb-4 font-weight-bold grey--text text--darken-3">Третья секция</p>
    <div class="text-left">
      <p class="title mb-3 grey--text text--darken-3">Топ 5 фильмов</p>
      <v-progress-circular v-if="!topFilms.length" indeterminate color="primary" />
      <FilmList v-else :value="topFilms" />
      <p class="title mt-5 mb-3 grey--text text--darken-3">Поиск фильмов</p>
      <v-text-field v-model="searchInput" label="Название..." variant="solo"></v-text-field>
      <v-progress-circular v-if="loading" indeterminate color="primary" />
      <FilmList v-else-if="item.films.length" :value="item.films" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { FilmsSection } from '@/common/interfaces'
import { Film } from '@/common/interfaces'

import FilmList from '@/components/helpers/FilmList.vue'

const SEARCH_DELAY = 700 // ms

export default Vue.extend({
  name: 'FilmsSection',
  components: {
    FilmList
  },
  props: {
    value: {
      type: Object as PropType<FilmsSection>,
      required: true
    }
  },
  data() {
    return {
      item: this.value,
      searchInput: '',
      loading: false,
      timer: null as number | null
    }
  },
  computed: {
    ...mapGetters(['topFilms'])
  },
  watch: {
    searchInput: function () {
      this.setTimer()
    }
  },
  mounted() {
    this.fetchTopFilms()
  },
  methods: {
    ...mapActions(['fetchTopFilms', 'fetchFilms']),
    clearTimer() {
      if (this.timer === null) return
      clearTimeout(this.timer)
      this.timer = null
    },
    setTimer() {
      this.clearTimer()
      if (!this.searchInput) {
        this.item.films = []
        this.loading = false
        return
      }
      this.timer = setTimeout(this.findContent, SEARCH_DELAY)
      this.loading = true
    },
    findContent() {
      this.clearTimer()
      if (!this.searchInput) {
        this.item.films = []
        this.loading = false
      } else {
        this.fetchFilms(this.searchInput).then((videos: Film[]) => {
          if (videos) this.item.films = videos
          this.loading = false
        })
      }
    }
  }
})
</script>
