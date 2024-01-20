import axios from 'axios'
import { API_URL } from '@/shared/config'
import type { AxiosPromise } from 'axios'
import { type IGroup } from '@/stores/root/types'

export const apiInstance = axios.create({
  baseURL: API_URL
})

const BASE_URL = '/groups'

export const getGroups = (): AxiosPromise<any[]> => {
  return apiInstance.get(BASE_URL)
}

export const updateGroup = (id: string, data: IGroup): AxiosPromise<any> => {
  return apiInstance.patch(`${BASE_URL}/${id}`, data)
}

export const addGroup = (data: IGroup): AxiosPromise<any> => {
  return apiInstance.post(BASE_URL, data)
}
