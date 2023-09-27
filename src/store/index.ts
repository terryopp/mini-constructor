import Vue from 'vue'
import Vuex, { GetterTree, ActionTree, MutationTree, StoreOptions } from 'vuex'
import axios from 'axios'

import { Film, FilmsState } from '@/common/interfaces'

Vue.use(Vuex)

const headers = {
  'X-API-KEY': '76a4a93a-1f92-411b-8890-b1e09fd0c9e4',
  'Content-Type': 'application/json'
}

interface FilmsSearchedByName {
  kinopoiskId: number
  nameOriginal: string
  nameRu: string
  posterUrlPreview: string
  ratingKinopoisk: number | string
}

const state = (): FilmsState => ({
  topFilms: [],
  isSearchingTopFilms: false
})

const getters: GetterTree<FilmsState, FilmsState> = {
  topFilms: (statement): Film[] => statement.topFilms,
  isSearchingTopFilms: (statement): boolean => statement.isSearchingTopFilms
}

const mutations: MutationTree<FilmsState> = {
  setTopFilms: (state, value: Film[]) => (state.topFilms = value),
  setSearchingTopFilms: (state, value: boolean) => (state.isSearchingTopFilms = value)
}

const actions: ActionTree<FilmsState, FilmsState> = {
  fetchTopFilms({ commit }) {
    if (this.getters.isSearchingTopFilms || this.getters.topFilms.length) return
    commit('setSearchingTopFilms', true)
    axios
      .get('https://kinopoiskapiunofficial.tech/api/v2.2/films/top', {
        headers
      })
      .then(response => response?.data?.films || null)
      .then((films: Film[] | null) => (films ? commit('setTopFilms', films.slice(0, 5)) : null))
      .catch(error => console.error(error))
      .finally(() => commit('setSearchingTopFilms', false))
  },
  async fetchFilms(_, name: string): Promise<Film[] | null> {
    return await axios
      .get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?keyword=${name}`, {
        headers
      })
      .then(response => response?.data?.items || null)
      .then((films: FilmsSearchedByName[] | null) =>
        films
          ? films
              .map(
                item =>
                  ({
                    filmId: item.kinopoiskId,
                    nameEn: item.nameOriginal,
                    nameRu: item.nameRu,
                    posterUrl: item.posterUrlPreview,
                    rating: String(item.ratingKinopoisk)
                  } as Film)
              )
              .slice(0, 5)
          : null
      )
      .catch(error => {
        console.error(error)
        return null
      })
  }
}

const store: StoreOptions<FilmsState> = {
  state,
  getters,
  mutations,
  actions
}

export default new Vuex.Store<FilmsState>(store)
