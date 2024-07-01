import axios from '@axios'

import type { AddressParams, OrganizationParams } from '@/views/apps/organization/types'
import {product} from "@/views/apps/calculator/types";

export async function create(data: product) {
  try {
    return await axios.post('product/create', data)
  }
  catch (err) {
    throw new Error(err.message)
  }
}
export async function findAll() {
  try {
    return await axios.get('product/findAll')
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function findOne() {
  try {
    return await axios.get('product/findOne')
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function update(data: OrganizationParams) {
  try {
    return await axios.put('product/update', data)
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function remove(data: OrganizationParams) {
  try {
    return await axios.delete('product/delete', { data })
  }
  catch (err) {
    throw new Error(err.message)
  }
}
