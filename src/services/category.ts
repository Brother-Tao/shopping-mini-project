import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

export const gteCategoryApi = () => {
  return http<CategoryTopItem[]>({
    url: '/category/top',
    method: 'GET',
  })
}
