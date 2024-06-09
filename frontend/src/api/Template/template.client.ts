import axios from '@axios'

import type { templateCreateRequest, templateFilterParams } from '@/views/apps/template/types'

export async function findAll(params: templateFilterParams) {
  try {
    const response = await axios.get('template/findAll', { params })

    return response.data
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function create(data: templateCreateRequest) {
  try {
    const response = await axios.post('template/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('response-service', response)

    return response
  }
  catch (err) {
    return err.response
  }
}
