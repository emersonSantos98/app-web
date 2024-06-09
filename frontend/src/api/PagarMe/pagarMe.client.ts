import axios from '@axios'

export async function checkout(payload) {
  try {
    return await axios.post('/pagarme/checkout/create', payload)
  }
  catch (error) {
    throw new Error(error.message)
  }
}
