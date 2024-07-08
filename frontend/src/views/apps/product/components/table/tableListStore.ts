import { defineStore } from 'pinia'
import Notifier from '@core/utils/Notifier'
import { findAll } from '@/api/Calculator/calculation.client'

const notifier = new Notifier()
export const tableListStore = defineStore('tableListStore', {
  state: () => ({
    loading: false,
    tableData: [],
  }),

  actions: {
    async fetchTableData() {
      try {
        this.loading = true

        const response = await findAll()

        this.tableData = response.data.data
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
