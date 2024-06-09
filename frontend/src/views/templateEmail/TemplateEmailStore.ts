import { defineStore } from 'pinia'
import type { templateEmailParams } from '@/views/templateEmail/types'
import { create, deleteTemplate, findAll, findOne, update } from '@/api/TemplateEmail/templateMail.client'
import Notifier from '@core/utils/Notifier'
import { useAppLayoutStore } from '@/store/appLayout'

const notifier = new Notifier()
const appLayout = useAppLayoutStore()

export const useTemplateEmailStore = defineStore('TemplateEmailStore', {

  state: () => ({
    loading: false,
  }),

  actions: {
    // 👉 Fetch users data
    async findAll() {
      try {
        this.loading = true
        appLayout.setLoading(true)

        const response = await findAll()

        this.loading = false
        appLayout.setLoading(false)

        return response
      }
      catch (err) {
        throw new Error(err.message)
      }
    },

    async update(data: templateEmailParams) {
      try {
        this.loading = true
        appLayout.setLoading(true)

        const response = await update(data)

        if (response.status === 200) {
          notifier.success('Template Email updated successfully')
          this.loading = false
          appLayout.setLoading(false)
        }

        else { notifier.error('Something went wrong') }
      }
      catch (err) {
        // Notifier.error(`Erro ao atualizar o perfil ${err.message}`)
      }
    },

    async findOne() {
      try {
        this.loading = true
        appLayout.setLoading(true)

        const response = await findOne()

        this.loading = false
        appLayout.setLoading(false)

        return response.data
      }
      catch (err) {
        throw new Error(err.message)
      }
    },

    async delete(id: number) {
      try {
        this.loading = true
        appLayout.setLoading(true)

        const response = await deleteTemplate(id)

        this.loading = false
        appLayout.setLoading(false)

        return response.data
      }
      catch (err) {
        throw new Error(err.message)
      }
    },

    async create(data: templateEmailParams) {
      try {
        this.loading = true
        appLayout.setLoading(true)

        const response = await create(data)

        if (response.status === 201) {
          notifier.success('Template Email created successfully')
          this.loading = false
          appLayout.setLoading(false)
        }
        else { notifier.error('Something went wrong') }
      }
      catch (err) {
        throw new Error(err.message)
      }
    },
  },
})
