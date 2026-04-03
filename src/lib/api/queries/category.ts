import { queryOptions } from '@tanstack/react-query'

import { DEFAULT_PAGINATE } from '@/lib/constants/paginate'

import { PaginateDto } from '../dtos/paginate'
import { services } from '../services'

const listCategories = (params?: PaginateDto) =>
  queryOptions({
    queryKey: ['categories', params],
    queryFn: () => {
      const pagination = params ?? DEFAULT_PAGINATE

      return services.categories.list(pagination)
    },
  })

interface GetCategoryParams {
  id: number
}

const getCategory = (params: GetCategoryParams) =>
  queryOptions({
    queryKey: ['category', params.id],
    queryFn: () => {
      return services.categories.get(params.id)
    },
  })

export const categoryQueries = {
  list: listCategories,
  get: getCategory,
} as const
