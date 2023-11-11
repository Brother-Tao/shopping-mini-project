import type { LoginResult } from '@/types/global'
import { http } from '@/utils/http'

type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

export const getLoginApi = (data: LoginParams) => {
  return http<LoginResult>({
    url: '/login/wxMin',
    method: 'POST',
    data,
  })
}

// 内测登录接口：/login/wxMin/simple

export const postLoginSimpleApi = (phoneNumber: String) => {
  return http<LoginResult>({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber,
    },
  })
}
