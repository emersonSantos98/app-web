<script setup lang="ts">
import { ref } from 'vue'
import { useTemplateStore } from '@/views/apps/template/Template.store'
import { paginationMeta } from '@/@fake-db/utils'
import type { templateFilterParams } from '@/views/apps/template/types'

const templateListStore = useTemplateStore()

const searchQuery = ref('')
const currentStatus = ref('')
const currentTag = ref('')
const itemsPerPage = ref(10)
const totalTemplate = ref(templateListStore.getPageInfo.totalItems)
const icons = ref(['tabler-edit-circle', 'tabler-trash'])

const options = ref<templateFilterParams>({
  name: searchQuery.value,
  status: currentStatus.value,
  tags: currentTag.value,
  page: 1,
  pageSize: itemsPerPage.value,
})

const currentPage = ref(1)

currentPage.value = options.value.page

function fetchTemplate(query: string, currentStatus: string, currentTag: string, currentPage: number, itemsPerPage: number) {
  templateListStore.fetchTemplates(
    {
      name: query,
      status: currentStatus,
      tags: currentTag,
      page: currentPage,
      pageSize: itemsPerPage,
    },
  ).then(response => {
    console.log('response', response)
  }).catch(error => {
    console.log(error)
  })
}

function acao(index: number, item: any) {
  console.log('acao', index, item)
}

watchEffect(() => {
  fetchTemplate(
    searchQuery.value,
    currentStatus.value,
    currentTag.value,
    currentPage.value,
    itemsPerPage.value)
})
</script>

<template>
  <VCol v-if="templateListStore.getTemplates">
    <VRow>
      <VCol
        cols="12"
      >
        <VCard
          id="template-list"
        >
          <VCardText class="d-flex align-center flex-wrap gap-4">
            <div class="me-3 d-flex gap-3">
              <AppSelect
                :model-value="itemsPerPage"
                :items="[
                  { value: 3, title: '3' },
                  { value: 5, title: '5' },
                  { value: 10, title: '10' },
                  { value: 100, title: '100' },
                  { value: -1, title: 'All' },
                ]"
                style="width: 6.25rem;"
                @update:model-value="itemsPerPage = parseInt($event, 10)"
              />
              <!-- 👉 Create invoice -->
              <VBtn
                prepend-icon="tabler-plus"
                :to="{ name: 'template-add' }"
              >
                Create Template
              </VBtn>
            </div>

            <VSpacer />

            <div class="d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div class="template-list-filter">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="Search Template"
                  density="compact"
                />
              </div>

              <!-- 👉 Select status -->
              <div class="template-list-filter">
                <AppSelect
                  v-model="currentStatus"
                  placeholder="Select Status"
                  clearable
                  clear-icon="tabler-x"
                  single-line
                  :items="['Started', 'Completed', 'Pending']"
                />
              </div>
              <div class="template-list-filter">
                <AppSelect
                  v-model="currentTag"
                  placeholder="Select tags"
                  clearable
                  clear-icon="tabler-x"
                  single-line
                  :items="['Negócio Local', 'Completed', 'Pending']"
                />
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
      >
        <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
          <p class="text-sm text-disabled mb-0">
            {{
              paginationMeta({
                itemsPerPage,
                page: currentPage,
                total: totalTemplate,
              }, totalTemplate)
            }}
          </p>

          <VPagination
            v-model="currentPage"
            :length="Math.ceil(totalTemplate / itemsPerPage)"
            :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalTemplate / itemsPerPage)"
          >
            <template #prev="slotProps">
              <VBtn
                variant="tonal"
                color="default"
                v-bind="slotProps"
                :icon="false"
              >
                Previous
              </VBtn>
            </template>

            <template #next="slotProps">
              <VBtn
                variant="tonal"
                color="default"
                v-bind="slotProps"
                :icon="false"
              >
                Next
              </VBtn>
            </template>
          </VPagination>
        </div>
      </VCol>
    </VRow>
    <VRow />
    <VRow>
      <VCol
        v-for="(item, i) in templateListStore.getTemplates"
        :key="i"
        cols="12"
        sm="4"
        md="4"
      >
        <VHover v-slot="{ isHovering, props }">
          <VCard
            id="listCards"
            :elevation="isHovering ? 12 : 2"
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
          >
            <VOverlay
              v-model="templateListStore.getLoading"
              contained

              persistent
              class="align-center justify-center"
            >
              <VProgressCircular indeterminate />
            </VOverlay>
            <VImg
              :src="item.thumbUrl"
              height="225px"
              cover
            >
              <VCardTitle class="text-h5 text-white d-flex  flex-wrap pt-0">
                <p
                  class="mt-12 mb-0 font-weight-bold"
                  :class="{ 'show-btns': isHovering }"
                >
                  {{ item.name }}
                </p>

                <div>
                  <p class="ma-0 text-body-5 font-weight-bold mt-4">
                    {{ item.tags }}
                  </p>
                  <p class="text-caption font-weight-medium mt-3">
                    {{ item.status }}
                  </p>
                </div>
              </VCardTitle>
              <div class="align-self-center d-flex justify-center">
                <VBtn
                  v-for="(icon, index) in icons"
                  :key="index"
                  variant="text"
                  :class="{ 'show-btns': isHovering }"
                  color="rgba(255, 255, 255, 0)"
                  :icon="icon"
                  @click="acao(index, item)"
                />
              </div>
            </VImg>
          </VCard>
        </VHover>
      </VCol>
    </VRow>
  </VCol>
</template>

<style lang="scss" scoped>
#template-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .template-list-filter {
    inline-size: 12rem;
  }
}
#listCards {
  transition: opacity .4s ease-in-out;
}

#listCards:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
