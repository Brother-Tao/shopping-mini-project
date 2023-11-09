import type { PageParams } from '@/types/global'
import type { HotResult } from '../types/hot.d'
import { http } from '@/utils/http'

type HotParams = PageParams & {
  /** Tab 项的 id，默认查询全部 Tab 项的第 1 页数据 */
  subType?: string
}

export const getHotRecommendApi = (url: string, data?: HotParams) => {
  return http<HotResult>({
    url,
    method: 'GET',
    data,
  })
}
