import type { PageResult } from '@/types/global'
import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home'
import { http } from '@/utils/http'

export const getHomeBannerApi = (distributionSite = 1) => {
  return http<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}

export const getCategoryPanelApi = () => {
  return http<CategoryItem[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}

export const getHotPanelApi = () => {
  return http<HotItem[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}

export const gteGuessLikeApi = (page = 1, pageSize = 10) => {
  return http<PageResult<GuessItem>>({
    url: '/home/goods/guessLike',
    method: 'GET',
    data: {
      page,
      pageSize,
    },
  })
}
