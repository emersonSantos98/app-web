import axios from '@axios'


export async function create(data: any ) {
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

export async function update(data) {
  try {
    return await axios.put('product/update', data)
  }
  catch (err) {
    throw new Error(err.message)
  }
}

export async function remove(id: number) {
  try {
    return await axios.delete(`product/delete/${id}`)
  }
  catch (err) {
    throw new Error(err.message)
  }
}
