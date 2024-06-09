import { defineStore } from 'pinia'
import type { templateCreateRequest, templateFilterParams } from '@/views/apps/template/types'
import { create, findAll } from '@/api/Template/template.client'

import Notifier from '@core/utils/Notifier'

const notifier = new Notifier()

export const useTemplateStore = defineStore('template', {
  state: () => ({
    templates: [],
    pageInfo: {},
    loading: false,
  }),
  getters: {
    getTemplates() {
      return this.templates
    },
    getPageInfo() {
      return this.pageInfo
    },
    getLoading() {
      return this.loading
    },
  },
  actions: {
    async fetchTemplates(params: templateFilterParams) {
      try {
        this.loading = true

        const response = await findAll(params)

        this.templates = response.Templates
        this.pageInfo = response.pageInfo
      }
      catch (err) {
        notifier.error(err.message)
      }
      finally {
        this.loading = false
      }
    },
    async createTemplate(payload: templateCreateRequest) {
      try {
        this.loading = true

        const result = await create(payload)
        if (result.status === 201)
          notifier.success('Template created successfully')
      }
      catch (err) {
        console.log('err', err)
        notifier.error(err.message)
      }
      finally {
        this.loading = false
      }
    },
  },
})
