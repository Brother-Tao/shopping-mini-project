import type { PageResult, PageParams } from '@/types/global'
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

export const gteGuessLikeApi = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    url: '/home/goods/guessLike',
    method: 'GET',
    data,
  })
}
