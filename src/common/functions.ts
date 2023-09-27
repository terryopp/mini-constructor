import { SectionType } from './enums'
import { Section } from './types'
import { TextSection } from './interfaces'

import { v4 as randomId } from 'uuid'

export const createSection = (type: SectionType): Section => {
  switch (type) {
    case SectionType.Cards:
      return {
        id: randomId(),
        type: SectionType.Cards,
        components: [...Array(7)].map(
          () => ({ ...createSection(SectionType.Text), icon: 'mdi-plus' } as TextSection)
        )
      }
    case SectionType.Films:
      return {
        id: randomId(),
        type: SectionType.Films,
        films: []
      }
    default:
      return {
        id: randomId(),
        type: SectionType.Text,
        title: 'Title',
        content: 'Content'
      }
  }
}
