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

interface Data<T> {
  code: string
  msg: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          memberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          uni.showToast({
            title: (res.data as Data<T>).msg,
            icon: 'none',
          })
          reject(res)
        }
      },
      // 失败回调
      fail(err) {
        uni.showToast({
          title: '网络错误',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}
