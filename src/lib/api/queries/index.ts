import { categoryQueries } from './category'
import { osmQueries } from './osm'

export const queries = {
  osm: osmQueries,
  categories: categoryQueries,
} as const
