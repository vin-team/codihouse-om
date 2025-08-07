import axios, { AxiosResponse } from 'axios'
import { storage } from '../../utils/storage.util'
//import { AuthService } from '../Auth.service'
// import { URLSearchParams } from 'url';
class HttpService {
  static instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_baseApiURL,
    timeout: 90000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json'
    }
  })
  static isRefreshing = false
  static refreshMethod: Promise<AxiosResponse<any, any>>
  static commonParams() {
    return {
      // create_user: storage.getItem(process.env.NEXT_PUBLIC_storageUserKey!),
      // update_user: storage.getItem(process.env.NEXT_PUBLIC_storageUserKey!),
    }
  }
  static getLocalToken() {
    return storage.getItem(process.env.NEXT_PUBLIC_storageAccessTokenKey!)
  }
  static getLocalRefreshToken() {
    return storage.getItem(process.env.NEXT_PUBLIC_storageRefreshTokenKey!)
  }
  static setToken(token: string) {
    HttpService.instance.defaults.headers['Authorization'] = `Bearer ${token}`
    storage.setItem(process.env.NEXT_PUBLIC_storageAccessTokenKey!, token)
  }
  static setLocalRefToken(token: string) {
    storage.setItem(process.env.NEXT_PUBLIC_storageRefreshTokenKey!, token)
  }
  static initialize() {
    this.checkAndAddHeaderAuthToken()
    HttpService.instance.interceptors.request.use((request) => {
      return request
    })
    const refreshToken = () => {
      if (HttpService.isRefreshing) {
        return HttpService.refreshMethod
      }
      HttpService.isRefreshing = true
      HttpService.refreshMethod = this.doPostRequest(
        process.env.NEXT_PUBLIC_baseApiURL + '/auth/refresh',
        { refreshToken: this.getLocalRefreshToken() },
        false
      )
      return HttpService.refreshMethod
    }
    HttpService.instance.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        storage.setItem(process.env.NEXT_PUBLIC_storageIsRefreshingTokenKey!, HttpService.isRefreshing.toString())
        if (error.response?.status === 401 && !HttpService.isRefreshing) {
          try {
            const rs = await refreshToken()
            if (rs.status === 200) {
              const { accessToken } = rs.data
              if (HttpService.isRefreshing) {
                HttpService.setToken(accessToken)
                HttpService.isRefreshing = false
              }
              const config = error.config
              config.headers['Authorization'] = `Bearer ${accessToken}`
              return await HttpService.instance.request(config)
            } else {
              return Promise.reject(rs)
            }
          } catch (error) {
            return Promise.reject(error)
          }
        }
        else {
          error.message = error.response?.data.message;
          return Promise.reject(error)
        }
      }
    )
  }
  static checkAndAddHeaderAuthToken() {
    if (!HttpService.instance.defaults.headers['Authorization']) {
      const token = HttpService.getLocalToken()
      if (token) {
        HttpService.instance.defaults.headers['Authorization'] = `Bearer ${token}`
      }
    }
  }
  static async doPostRequest(url: string, data: any, withAccessToken = true) {
    if (!withAccessToken) {
      delete HttpService.instance.defaults.headers['Authorization']
      return HttpService.instance.post(url, data, { headers: { 'x-api-key': process.env.NEXT_PUBLIC_xApiKey } })
    } else {
      const params = { ...Object(data), ...this.commonParams() }
      this.checkAndAddHeaderAuthToken()
      const response = HttpService.instance.post(url, params)
      return response
    }
  }

  static async doGetRequest(url: string, data: any, withAccessToken = true) {
    if (!withAccessToken) {
      delete HttpService.instance.defaults.headers['Authorization']
      return HttpService.instance.get(url, { params: data, headers: { 'x-api-key': process.env.NEXT_PUBLIC_xApiKey } })
    } else {
      const params = { ...Object(data), ...this.commonParams() }
      this.checkAndAddHeaderAuthToken()
      return HttpService.instance.get(url, { params: params })
    }
  }

  static async doPatchRequest(url: string, data: any, withAccessToken = true) {
    if (!withAccessToken) {
      delete HttpService.instance.defaults.headers['Authorization']
      return HttpService.instance.patch(url, data, { headers: { 'x-api-key': process.env.NEXT_PUBLIC_xApiKey } })
    } else {
      const params = { ...Object(data), ...this.commonParams() }
      this.checkAndAddHeaderAuthToken()
      return HttpService.instance.patch(url, params)
    }
  }

  static async doPutRequest(url: string, data: any, withAccessToken = true) {
    if (!withAccessToken) {
      delete HttpService.instance.defaults.headers['Authorization']
      return HttpService.instance.put(url, data, { headers: { 'x-api-key': process.env.NEXT_PUBLIC_xApiKey } })
    } else {
      const params = { ...Object(data), ...this.commonParams() }
      this.checkAndAddHeaderAuthToken()
      return HttpService.instance.put(url, params)
    }
  }

  static async doDeleteRequest(url: string, data: any) {
    const params = { ...Object(data), ...this.commonParams() }
    return HttpService.instance.delete(url, { data: params, headers: { 'x-api-key': process.env.NEXT_PUBLIC_xApiKey } })
  }
}
export { HttpService }
