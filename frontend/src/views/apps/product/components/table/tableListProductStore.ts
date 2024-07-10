import { defineStore } from 'pinia'
import Notifier from '@core/utils/Notifier'
import { findAll } from '@/api/Product/product.client'

const notifier = new Notifier()
export const tableListProductStore = defineStore('tableListProductStore', {
  state: () => ({
    loading: false,
    tableProduct: [],
  }),

  actions: {
    async fetchTableData() {
      try {
        this.loading = true

        const response = await findAll()
        console.log('response', response)
        this.tableProduct = response.data.data
      }
      catch (err) {
        notifier.error(`Error fetching table data: ${err.message}`)
      }
      finally {
        this.loading = false
      }
    },
  },
})
