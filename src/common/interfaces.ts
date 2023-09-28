import { SectionType } from './enums'

interface BaseSection {
  id: string
  type: SectionType
}

export interface TextSection extends BaseSection {
  type: SectionType.Text
  title: string
  content: string
  icon?: string
}

export interface CardsSection extends BaseSection {
  type: SectionType.Cards
  components: TextSection[]
}

export interface FilmsSection extends BaseSection {
  type: SectionType.Films
  films: Film[]
}

export interface Film {
  filmId: number
  nameEn: string
  nameRu: string
  posterUrl: string
  rating: string
}

export interface FilmsState {
  topFilms: Film[]
  isSearchingTopFilms: boolean
}
