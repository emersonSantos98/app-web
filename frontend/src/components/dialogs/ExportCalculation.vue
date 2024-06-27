<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  calcDetails: () => ({
    name: '',
    description: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    interest: [],
  }),
})

const emit = defineEmits<Emit>()
const isDialogVisible = ref(false)
const name = ref('')
const description = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const age = ref()
const interest = ref<string[]>([])
interface Details {
  name: string
  description: string
  lastName: string
  email: string
  password: string
  age: number
  interest: string[]
}
interface Emit {
  (e: 'submit', value: Details): void
  (e: 'update:isDialogVisible', value: boolean): void
}

interface Props {
  calcDetails?: Details
  isDialogVisible: boolean
}

const calcDetails = ref<Details>(structuredClone(toRaw(props.calcDetails)))

watch(props, () => {
  calcDetails.value = structuredClone(toRaw(props.calcDetails))
})

function formSubmit() {
  emit('submit', calcDetails.value)
}

function dialogModelValueUpdate(val: boolean) {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 580"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog Content -->
    <VCard title="Exportar Calculo">
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="7"
            md="12"
          >
            <AppTextField
              v-model="name"
              label="Nome do Produto"
              placeholder="Vestido"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="12"
          >
            <AppTextField
              v-model="description"
              label="Descrição"
              placeholder="Vestido de festa"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="$emit('update:isDialogVisible', false)"
        >
          fechar
        </VBtn>
        <VBtn @click="formSubmit">
          Salvar
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
