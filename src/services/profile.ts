import type { ProfileDetail, ProfileParams } from '@/types/menber'
import { http } from '@/utils/http'

export const getMemberProfileApi = () => {
  return http<ProfileDetail>({
    url: '/member/profile',
    method: 'GET',
  })
}

// 修改个人信息 xiu

export const updateMemberProfileApi = (data: ProfileParams) => {
  return http<ProfileDetail>({
    url: '/member/profile',
    method: 'PUT',
    data,
  })
}
