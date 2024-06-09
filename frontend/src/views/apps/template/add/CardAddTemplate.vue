 <script setup lang="ts">
 import { useDropZone, useFileDialog, useObjectUrl } from '@vueuse/core'
 import { ref } from 'vue'
 import { VForm } from 'vuetify/components/VForm'
 import type { templateCreateRequest } from '@/views/apps/template/types'
 import { requiredValidator } from '@validators'
 import { useTemplateStore } from '@/views/apps/template/Template.store'

 const templateStore = useTemplateStore()

 const dropZoneRef = ref<HTMLDivElement>()
 interface FileData {
  file: File
  url: string
 }

 const fileData = ref<FileData[]>([])
 const name = ref('')
 const status = ref('')
 const tags = ref('')
 const refForm = ref<VForm>()

 async function create() {
  const Paramns: templateCreateRequest = {
    name: name.value,
    status: status.value,
    tags: tags.value,
    thumb: fileData.value[0].file,
  }

  await templateStore.createTemplate(Paramns)
  clearForm()
 }

 function clearForm() {
  name.value = ''
  status.value = ''
  tags.value = ''
  fileData.value = []
  refForm.value?.reset()
 }

 const { open, onChange } = useFileDialog({ accept: 'image/*' })

 function onDrop(DroppedFiles: File[] | null) {
  if (DroppedFiles && DroppedFiles.length > 0) {
    const file = DroppedFiles[0]

    if (file.type.slice(0, 6) !== 'image/') {
      // eslint-disable-next-line no-alert
      alert('Only image files are allowed')

      return
    }

    fileData.value = [{
      file,
      url: useObjectUrl(file).value ?? '',
    }]
  }
 }

 onChange(selectedFiles => {
  if (selectedFiles && selectedFiles.length > 0) {
    const file = selectedFiles[0]

    fileData.value = [{
      file,
      url: useObjectUrl(file).value ?? '',
    }]
  }
 })

 useDropZone(dropZoneRef, onDrop)
 </script>

 <template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Add a new template
        </h4>
      </div>
    </div>
    <VForm
      ref="refForm"
      @submit.prevent="() => {}"
    >
      <VRow>
        <VCol>
          <VBtn
              variant="elevated"
              class="me-4"
              type="submit"
              :disabled="templateStore.getLoading"
              :to="{ name: 'template-list' }"
          >
            Voltar para lista
          </VBtn>
        </VCol>
        <VCol md="12">
          <!-- 👉 Product Information -->
          <VCard
            class="mb-6"
            title="Product Information"
          >
            <VOverlay
              v-model="templateStore.getLoading"
              contained

              persistent
              class="align-center justify-center"
            >
              <VProgressCircular indeterminate />
            </VOverlay>
            <VCardText>
              <VRow>
                <VCol cols="12">
                  <AppTextField
                    v-model="name"
                    persistent-placeholder
                    :rules="[requiredValidator]"
                    label="Name"
                    placeholder="Template Name"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="status"
                    persistent-placeholder
                    :rules="[requiredValidator]"
                    label="status"
                    placeholder="Template Status"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="tags"
                    persistent-placeholder
                    :rules="[requiredValidator]"
                    label="tags"
                    placeholder="Template Tags"
                  />
                </VCol>
                <VCol>
                  <span class="mb-1">Description</span>
                  <TiptapEditor
                    v-model="description"
                    persistent-placeholder
                    :rules="[requiredValidator]"
                    placeholder="Template Description"
                    class="border rounded"
                  />
                </VCol>
              </VRow>
            </VCardText>
          </VCard>

          <!-- 👉 Media -->
          <VCard class="mb-6">
            <VOverlay
              v-model="templateStore.getLoading"
              contained

              persistent
              class="align-center justify-center"
            >
              <VProgressCircular indeterminate />
            </VOverlay>
            <VCardItem>
              <template #title>
                Media
              </template>
              <template #append>
                <span class="text-primary font-weight-medium text-sm cursor-pointer">Add Media from URL</span>
              </template>
            </VCardItem>

            <VCardText>
              <div class="flex">
                <div class="w-full h-auto relative">
                  <div
                    ref="dropZoneRef"
                    class="cursor-pointer"
                    @click="() => open()"
                  >
                    <div
                      v-if="fileData.length === 0"
                      class="d-flex flex-column justify-center align-center gap-y-3 px-6 py-10 border-dashed drop-zone"
                    >
                      <IconBtn
                        variant="tonal"
                        class="rounded-sm"
                      >
                        <VIcon icon="tabler-upload" />
                      </IconBtn>
                      <div class="text-base text-high-emphasis font-weight-medium">
                        Drag and Drop Your Image Here.
                      </div>
                      <span class="text-disabled">or</span>

                      <VBtn variant="tonal">
                        Browse Images
                      </VBtn>
                    </div>

                    <div
                      v-else
                      class="d-flex justify-center align-center gap-3 pa-8 border-dashed drop-zone flex-wrap"
                    >
                      <VRow class="match-height w-100 justify-center">
                        <template
                          v-for="(item, index) in fileData"
                          :key="index"
                        >
                          <VCol
                            cols="12"
                            sm="4"
                          >
                            <VCard
                              :ripple="false"
                              border
                            >
                              <VCardText
                                class="d-flex flex-column"
                                @click.stop
                              >
                                <VImg
                                  :src="item.url"
                                  width="200px"
                                  height="150px"
                                  class="w-100 mx-auto"
                                />
                                <div class="mt-2">
                                  <span class="clamp-text text-wrap">
                                    {{ item.file.name }}
                                  </span>
                                  <span>
                                    {{ item.file.size / 1000 }} KB
                                  </span>
                                </div>
                              </VCardText>
                              <VSpacer />
                              <VCardActions>
                                <VBtn
                                  variant="outlined"
                                  block
                                  @click.stop="fileData.splice(index, 1)"
                                >
                                  Remove File
                                </VBtn>
                              </VCardActions>
                            </VCard>
                          </VCol>
                        </template>
                      </VRow>
                    </div>
                  </div>
                </div>
              </div>
            </VCardText>
          </VCard>
        </vcol>
        <VCol>
          <VBtn
            variant="elevated"
            class="me-4"
            type="submit"
            :disabled="templateStore.getLoading"
            @click="refForm?.validate() && create()"
          >
            salvar
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
 </template>

 <style lang="scss" scoped>
 .drop-zone {
  border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 6px;
 }
 </style>

 <style lang="scss">
 .inventory-card{
  .v-radio-group,
  .v-checkbox {
    .v-selection-control {
      align-items: start !important;

      .v-selection-control__wrapper{
        margin-block-start: -0.375rem !important;
      }
    }

    .v-label.custom-input {
      border: none !important;
    }
  }

  .v-tabs.v-tabs-pill {
    .v-slide-group-item--active.v-tab--selected.text-primary {
      h6{
        color: #fff !important
      }
    }
  }

 }

 .ProseMirror{
  p{
    margin-block-end: 0;
  }

  padding: 0.5rem;
  outline: none;

  p.is-editor-empty:first-child::before {
    block-size: 0;
    color: #adb5bd;
    content: attr(data-placeholder);
    float: inline-start;
    pointer-events: none;
  }
 }
 </style>

<!--<script>-->
<!--import { ContentLoader } from 'vue-content-loader'-->

<!--export default {-->
<!--  components: { ContentLoader },-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <ContentLoader-->
<!--    viewBox="0 0 800 575"-->
<!--    :speed="2"-->
<!--    backgroundColor="#f3e7e7"-->
<!--    foregroundColor="#c7cdea"-->
<!--  >-->
<!--    <rect-->
<!--      x="7"-->
<!--      y="6"-->
<!--      rx="2"-->
<!--      ry="2"-->
<!--      width="786"-->
<!--      height="55"-->
<!--    />-->
<!--    <rect-->
<!--      x="603"-->
<!--      y="84"-->
<!--      rx="2"-->
<!--      ry="2"-->
<!--      width="70"-->
<!--      height="21"-->
<!--    />-->
<!--    <rect-->
<!--        x="20"-->
<!--        y="92"-->
<!--        rx="2"-->
<!--        ry="2"-->
<!--        width="107"-->
<!--        height="5"-->
<!--    />-->
<!--    <rect-->
<!--        x="677"-->
<!--        y="84"-->
<!--        rx="2"-->
<!--        ry="2"-->
<!--        width="22"-->
<!--        height="21"-->
<!--    />-->
<!--    <rect-->
<!--        x="703"-->
<!--        y="84"-->
<!--        rx="2"-->
<!--        ry="2"-->
<!--        width="22"-->
<!--        height="21"-->
<!--    />-->

<!--    <rect-->
<!--        x="729"-->
<!--        y="84"-->
<!--        rx="2"-->
<!--        ry="2"-->
<!--        width="50"-->
<!--        height="21"-->
<!--    />-->
<!--    <rect-->
<!--      x="8"-->
<!--      y="133"-->
<!--      rx="2"-->
<!--      ry="2"-->
<!--      width="250"-->
<!--      height="135"-->
<!--    />-->
<!--    <rect-->
<!--      x="274"-->
<!--      y="133"-->
<!--      rx="2"-->
<!--      ry="2"-->
<!--      width="250"-->
<!--      height="135"-->
<!--    />-->
<!--    <rect-->
<!--      x="541"-->
<!--      y="133"-->
<!--      rx="2"-->
<!--      ry="2"-->
<!--      width="250"-->
<!--      height="135"-->
<!--    />-->

<!--    <rect-->
<!--        x="8"-->
<!--        y="283"-->
<!--        rx="2"-->
<!--        ry="2"-->
<!--        width="250"-->
<!--        height="135"-->
<!--    />-->
<!--    <rect-->
<!--        x="274"-->
<!--        y="283"-->
<!--        rx="2"-->
<!--        ry="2"-->
<!--        width="250"-->
<!--        height="135"-->
<!--    />-->
<!--    <rect-->
<!--        x="541"-->
<!--        y="283"-->
<!--        rx="2"-->
<!--        ry="2"-->
<!--        width="250"-->
<!--        height="135"-->
<!--    />-->
<!--  </ContentLoader>-->
<!--</template>-->
