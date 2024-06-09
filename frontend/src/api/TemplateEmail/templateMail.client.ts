import axios from '@axios'
import type { TemplateMailParams } from '@/views/apps/templateMail/types'

export async function findAll() {
  try {
    const repos = await axios.get('/templateEmail/findAll')

    return repos.data
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function findOne() {
  try {
    return await axios.get('/templateMail/findOne')
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function update(data: TemplateMailParams) {
  try {
    return await axios.put('/templateMail/update', data)
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function deleteTemplate(id: number) {
  try {
    return await axios.delete(`/templateEmail/delete/${id}`)
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function create(data: TemplateMailParams) {
  try {
    return await axios.post('/templateEmail/create', data)
  }
  catch (err) {
    throw new Error(err.message)
  }
}
