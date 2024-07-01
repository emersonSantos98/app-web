import { defineStore } from 'pinia'
import Notifier from '@core/utils/Notifier'
import { useAppLayoutStore } from '@/store/appLayout'
import { create, findAll, findOne, remove, update } from '@/api/Calculator/product.client'
import type { product } from '@/views/apps/calculator/types'

const notifier = new Notifier()
const appLayout = useAppLayoutStore()
export const useCalculateMarketPlacesStore = defineStore('CalculateMarketPlacesStore', {
  state: () => ({
    loading: false,
  }),

  actions: {
    // 👉 Fetch users data
    async findAll(params: product) {
      try {
        this.loading = true
        appLayout.setLoading(true)

        const response = await findAll(params)

        this.loading = false

        appLayout.setLoading(false)

        return response
      }
      catch (err) {
        throw new Error(err.message)
      }
    },

    async create(data: product) {
      try {
        this.loading = true

        const response = await create(data)

        if (response.status === 200) {
          notifier.success('Product created successfully')
          this.loading = false
        }

        else { notifier.error('Something went wrong') }
      }
      catch (err) {
        notifier.error(`Error creating product ${err.message}`)
      }
    },

    async findOne() {
      try {
        this.loading = true
        appLayout.setLoading(true)

        const response = await findOne()

        this.loading = false

        appLayout.setLoading(false)

        return response
      }
      catch (err) {
        throw new Error(err.message)
      }
    },

    async update(data: product) {
      try {
        this.loading = true

        const response = await update(data)

        if (response.status === 200) {
          notifier.success('Product updated successfully')
          this.loading = false
        }

        else { notifier.error('Something went wrong') }
      }
      catch (err) {
        notifier.error(`Error updating product ${err.message}`)
      }
    },

    async remove(data: product) {
      try {
        this.loading = true

        const response = await remove(data)

        if (response.status === 200) {
          notifier.success('Product removed successfully')
          this.loading = false
        }

        else { notifier.error('Something went wrong') }
      }
      catch (err) {
        notifier.error(`Error removing product ${err.message}`)
      }
    },

  },

})
