//

import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    url: '/member/address',
    method: 'POST',
    data,
  })
}

// 获取收货地址列表
// GET
// /member/address

export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    url: '/member/address',
    method: 'GET',
  })
}

export const getMemberAddressByIdAPI = (id: String) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

/**
 * 修改收货地址
 * @param id 地址id(路径参数)
 * @param data 表单数据(请求体参数)
 */
export const putMemberAddressByIdAPI = (id: String, data: AddressParams) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}

/**
 * 删除收货地址
 * @param id 地址id(路径参数)
 */
export const deleteMemberAddressByIdAPI = (id: String) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
