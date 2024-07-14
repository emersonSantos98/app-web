import { defineStore } from 'pinia'
import Notifier from '@core/utils/Notifier'
import {findAll, remove} from '@/api/Product/product.client'

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
        this.tableProduct = response.data.data
      }
      catch (err) {
        notifier.error(`Error fetching table data: ${err.message}`)
      }
      finally {
        this.loading = false
      }
    },

    async deleteProduct(id: number) {
      try {
        this.loading = true

        const response = await remove(id)

        if (response.status === 200)
          notifier.success('Produto deletado com sucesso')
        else
          notifier.error('Erro ao deletar produto')
      }
      catch (err) {
        notifier.error(`Erro ao deletar produto: ${err.message}`)
      }
      finally {
        this.loading = false
      }
    },
  },
})
