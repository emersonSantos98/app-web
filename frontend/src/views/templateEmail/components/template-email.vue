<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import { avatarText } from '@/@core/utils/formatters'
import { useTemplateEmailStore } from '@/views/templateEmail/TemplateEmailStore'

interface Props {
  TemplateMailData: {
    id: number | null
    type: string
    from: string
    subject: string
    urlBucket: string

    status: string
  }
}
const props = defineProps<Props>()

const isTemplateMailCreateDialogVisible = ref(false)
const templateList = ref<Data[]>([])
const filteredTemplateList = ref([])
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

const defaultItem = ref<Data>({
  type: '',
  from: -1,
  subject: '',
  urlBucket: '',
  createdAt: '',
  status: '',
  actions: '',
})

const editedItem = ref<Data>(defaultItem.value)

const editedIndex = ref(-1)
const deleteDialog = ref(false)
const search = ref('')
const templateEmailStore = useTemplateEmailStore()

// headers
const headers = [
  { title: 'Type', key: 'type' },
  { title: 'From', key: 'from' },
  { title: 'Subject', key: 'subject' },
  { title: 'Url Bucket', key: 'urlBucket' },
  { title: 'Created', key: 'createdAt' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

function resolveStatusVariant(status: number) {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}

// function headers() {
//   const ret = [
//     { text: 'Type', value: 'type' },
//     { text: 'From', value: 'from' },
//     { text: 'Subject', value: 'subject' },
//     { text: 'Url Bucket', value: 'urlBucket' },
//     { text: 'Created', value: 'createdAt' },
//     { text: 'Status', value: 'status' },
//     { text: 'Actions', value: 'actions', sortable: false },
//
//   ]
//
//   ret.forEach(item => {
//     item.text = i18n.t(item.text)
//   })
//
//   return ret
// }

function deleteItem(item: Data) {
  editedItem.value = { ...item }

  deleteDialog.value = true

  console.log(editedItem, 'editedItem')
}

function deleteItemConfirm() {
  // const deteleItem = templateList.value.splice(editedIndex.value, 1)

  const id = editedItem.value.id

  templateEmailStore.delete(id).then(response => {
    findAll()
  }).catch(error => {
    console.error(error)
  })

  closeDelete()
}

function closeDelete() {
  deleteDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

async function findAll() {
  await templateEmailStore.findAll().then(response => {
    console.log(response.data, 'response findAll email')
    templateList.value = response.data
  }).catch(error => {
    console.error(error)
  })
}

function create(data) {
  templateEmailStore.create(data).then(response => {
    templateList.value = response.data

    findAll()
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(() => {
  findAll()
})

// onMounted(() => {
//
// })
</script>

<template>
  <VCard :loading="templateEmailStore.loading">
    <VCardTitle class="text-h5" />
    <VCardText>
      <VBtn
        color="primary"
        @click="isTemplateMailCreateDialogVisible = true"
      >
        <span class="me-2">{{ $t('Create') }}</span>
        <VIcon>mdi-plus</VIcon>
      </VBtn>
    </VCardText>

    <VCardText>
      <VRow>
        <VCol
          cols="12"
          offset-md="8"
          md="4"
        >
          <AppTextField
            v-model="search"
            density="compact"
            :placeholder="$t('Search')"
            append-inner-icon="tabler-search"
            single-line
            hide-details
            dense
            outlined
          />
        </VCol>
      </VRow>
    </VCardText>
    <VDataTable
      :headers="headers"
      :items="templateList"
      :items-per-page="options.itemsPerPage"
      :page="options.page"
      :loading="templateEmailStore.loading"
      :search="search"
      @update:options="options = $event"
    >
      <!-- full name -->
      <template #item.full_name="{ item }">
        <div class="d-flex align-center">
          <VAvatar
            size="32"
            :color="item.raw.avatar ? '' : 'primary'"
            :class="item.raw.avatar ? '' : 'v-avatar-light-bg primary--text'"
            :variant="!item.raw.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="item.raw.avatar"
              :src="item.raw.avatar"
            />
            <span v-else>{{ avatarText(item.raw.full_name) }}</span>
          </VAvatar>
          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text--primary text-truncate">{{ item.raw.full_name }}</span>
            <small>{{ item.raw.post }}</small>
          </div>
        </div>
      </template>

      <template #item.status="{ item }">
        <VChip
          :color="resolveStatusVariant(item.raw.status).color"
          class="font-weight-medium"
          size="small"
        >
          {{ resolveStatusVariant(item.raw.status).text }}
        </VChip>
      </template>     <!-- Actions -->
      <template #item.actions="{ item }">
        <IconBtn @click="editTemplateMail(item.raw.id)">
          <VIcon icon="tabler-edit" />
        </IconBtn>
        <IconBtn @click="deleteItem(item.raw)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>

      <template #bottom>
        <VCardText class="pt-2">
          <VRow>
            <VCol
              lg="2"
              cols="3"
            >
              <VTextField
                v-model="options.itemsPerPage"
                label="Rows per page:"
                type="number"
                min="-1"
                max="15"
                hide-details
                variant="underlined"
              />
            </VCol>

            <VCol
              lg="10"
              cols="9"
              class="d-flex justify-end"
            >
              <VPagination
                v-model="options.page"
                total-visible="5"
              />
            </VCol>
          </VRow>
        </VCardText>
      </template>
    </VDataTable>
  </vcard>

  <!-- 👉 Delete Dialog  -->
  <VDialog
    v-model="deleteDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>
        Are you sure you want to delete this item?
      </VCardTitle>

      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="closeDelete"
        >
          Cancel
        </VBtn>

        <VBtn
          color="success"
          variant="elevated"
          @click="deleteItemConfirm"
        >
          OK
        </VBtn>

        <VSpacer />
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- 👉 Edit user info dialog -->
  <AddTemplateMailDialog
    v-model:isDialogVisible="isTemplateMailCreateDialogVisible"
    :template-mail-data="props.TemplateMailData"
    @submit="create"
  />
</template>
