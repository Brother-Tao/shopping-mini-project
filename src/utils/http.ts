import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()

const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    // 拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    // 2.设置超时时间
    options.timeout = 10000

    // 添加请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加token
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
