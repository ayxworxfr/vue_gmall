import request from '@/utils/request'

export const getCampusList = (params: any) =>
  request({
    url: '/getCampusList',
    method: 'get',
    params
  })
  
export const addCampus = (data: any) =>
  request({
    url: '/addCampus',
    method: 'post',
    data
  })

export const updateCampus = (id: number, data: any) =>
  request({
    url: `/updateCampus/${id}`,
    method: 'put',
    data
  })

export const deleteCampus = (id: number) =>
  request({
    url: `/deleteCampus/${id}`,
    method: 'delete'
  })

