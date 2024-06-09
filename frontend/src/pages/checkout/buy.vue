<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { VForm } from 'vuetify/components/VForm'
import type { CheckoutData } from '../../views/register/models/types'
import { useCheckoutStore } from '@/views/checkout/CheckoutStore'
import { requiredValidator } from '@validators'

const prop = defineProps<{
  currentStep?: number
  checkoutData: CheckoutData
}>()

const emit = defineEmits<{
  (e: 'update:currentStep', value: number): void
  (e: 'update:checkout-data', value: CheckoutData): void
}>()

const notifications = ref<number>()
const refForm = ref<VForm | null>(null)
const router = useRouter()

const checkoutStore = useCheckoutStore()

const checkoutPaymentDataLocal = ref(prop.checkoutData)

const orderAmount = ref(0)
const deliverySpeed = ref('standard')
const deliveryCharges = ref(0)
const addresses = ref([])
const selectedAddress = ref(null)

// const selectedPaymentMethod = ref('credit_card')

const cardFormData = ref({
  cardNumber: '',
  cardName: null,
  monthSelection: null,
  yearSelection: null,
  cvv: null,

})

const giftCardFormData = ref({
  nomeSobrenome: null,
  email: null,
  cpfCnpj: null,
  celular: '',
  cep: '',
  endereco: null,
  numero: null,
  bairro: null,
  complemento: null,
  cidade: null,
  estado: null,
  numeroCartao: null,
  nomeCartao: null,
  validadeMes: null,
  validadeAno: null,
  cvv: null,
  selectedPaymentMethod: '',
  valor: 24500,
  descricao: 'Fioterapia GoldSpell',

})

const loading = ref(false)

const expiryDate = ref('') // Adicione aqui

function updateCartData() {
  emit('update:checkout-data', checkoutPaymentDataLocal.value)
}

function onSubmit() {
  if (refForm.value) {
    refForm.value.validate()
      .then(({ valid: isValid }) => {
        if (isValid)
          nextStep()
      })
  }
}

function nextStep() {
  console.log(validateFields(), 'validateFields')

  updateCartData()
  giftCardFormData.value.selectedPaymentMethod = selectedPaymentMethod.value

  const dddMatch = giftCardFormData.value.celular.match(/\((\d{2})\)/)

  const randomNumber = Math.floor(10000 + Math.random() * 90000)

  const payload = {
    cardName: cardFormData.value.cardName,
    number: cardFormData.value.cardNumber.replace(/\s/g, ''),
    exp_month: cardFormData.value.monthSelection,
    exp_year: cardFormData.value.yearSelection,
    cvv: cardFormData.value.cvv,
    closed: true,
    customer: {
      name: giftCardFormData.value.nomeSobrenome,
      type: 'individual',
      email: giftCardFormData.value.email,
      document: giftCardFormData.value.cpfCnpj.replace(/[.-]/g, ''),
      address: {
        line_1: `${giftCardFormData.value.numero}, ${giftCardFormData.value.endereco}, ${giftCardFormData.value.bairro}`,
        line_2: giftCardFormData.value.complemento,
        zip_code: giftCardFormData.value.cep.replace(/-/g, ''),
        city: giftCardFormData.value.cidade,
        state: giftCardFormData.value.estado,
        country: 'BR',
      },
      phones: {
        home_phone: {
          country_code: '55',
          area_code: dddMatch ? dddMatch[1] : null,
          number: giftCardFormData.value.celular.replace(/\D/g, '').slice(2),
        },
        mobile_phone: {
          country_code: '55',
          area_code: dddMatch ? dddMatch[1] : null,
          number: giftCardFormData.value.celular.replace(/\D/g, '').slice(2),
        },
      },
    },
    items: [
      {
        description: giftCardFormData.value.descricao,
        quantity: 1,
        amount: giftCardFormData.value.valor,
        code: randomNumber,
      },
    ],
    payments: [
      {
        payment_method: giftCardFormData.value.selectedPaymentMethod,
        credit_card: {
          installments: 1,
          statement_descriptor: 'GoldSpell',
          card: {
            billing_address: {
              line_1: `${giftCardFormData.value.numero}, ${giftCardFormData.value.endereco}, ${giftCardFormData.value.bairro}`,
              zip_code: giftCardFormData.value.cep.replace(/-/g, ''),
              city: giftCardFormData.value.cidade,
              state: giftCardFormData.value.estado,
              country: 'BR',
            },
          },
        },
      },
    ],
  }

  // emit('update:currentStep', prop.currentStep ? prop.currentStep + 1 : 1)

  checkoutStore.create(payload)
    .then(respose => {
      console.log('respose', respose)
    })
    .catch(error => {
      console.log('error', error)
    })
}

async function viaCep() {
  const response = await checkoutStore.findCep(giftCardFormData.value.cep.replace(/-/g, ''))

  giftCardFormData.value.endereco = response.logradouro
  giftCardFormData.value.bairro = response.bairro
  giftCardFormData.value.cidade = response.localidade
  giftCardFormData.value.estado = response.uf

  console.log('giftCardFormData', giftCardFormData)
}

function clickMe() {
  loading.value = true
  viaCep()

  setTimeout(() => {
    loading.value = false
  }, 2000)
}
function validateFields() {
  return (
    requiredValidator(giftCardFormData.value.email)

  )
}

function numericInput() {
  // Remove caracteres não numéricos
  giftCardFormData.value.numero = giftCardFormData.value.numero.replace(/\D/g, '')
}

const selectedPaymentMethod = ref(null)

const paymentMethods = [
  { name: 'Crédito', icon: 'mdi-credit-card' },
  { name: 'Boleto', icon: 'mdi-barcode' },
  { name: 'Pix', icon: 'mdi-qrcode' },
]

function selectPaymentMethod(index) {
  selectedPaymentMethod.value = index
}

onMounted(() => {
  selectedPaymentMethod.value = 0
})

watch(() => prop.currentStep, updateCartData)

const currentTab = ref('tab-1')
const tabItemText = 'Biscuit cheesecake gingerbread oat cake tiramisu. Marzipan tiramisu jelly-o muffin biscuit jelly cake pie. Chocolate cookie candy croissant brownie cupcake powder cheesecake. Biscuit sesame snaps biscuit topping tiramisu croissant.'
</script>

<template>
  <VMain class="layout-page-content">
    <div
      class="container paddingless"
    >
      <VRow>
        <!-- 👉 Delivery address -->
        <div class="v-col-sm-12">
          <div class="painel v2">
            <div class="label-painel2">
              <span class="font-black bg-primary">
                <VIcon
                  style="margin-right: 10px;"
                  icon="tabler-shopping-cart"
                />

              </span>
              <h6 class="font-bold marginless paddingless bg-primary">
                VOCÊ ESTÁ COMPRANDO
              </h6>
            </div>

            <Spa>
              Fioterapia GoldSpell 250ml  <span class="font-bold">R$ 245,00</span>
            </Spa>
          </div>
        </div>
      </VRow>  <img
        class="mx-auto img-header w-100 h-auto p-0 rounded mt-2"

        src="@/assets/images/gold.jpg"
      >

      <VForm
        ref="refForm"
        @submit.prevent="() => {}"
      >
        <VRow>
          <div
            class="v-col-sm-6"
          >
            <!-- 👉 Delivery address -->

            <div class="painel v2">
              <div class="label-painel">
                <span class="font-black bg-primary">1</span>
                <h6 class="font-bold marginless paddingless bg-primary">
                  DADOS PESSOAIS
                </h6>
              </div>

              <div class="row">
                <VCol
                  class="mb-4"
                  outlined
                >
                  <VRow>
                    <VCol cols="12">
                      <AppTextField
                        v-model="giftCardFormData.nomeSobrenome"
                        label="Nome e Sobrenome"
                        :rules="[requiredValidator(giftCardFormData.nomeSobrenome, 'Nome e Sobrenome')]"
                      />
                    </VCol>
                  </VRow>

                  <VRow>
                    <VCol cols="12">
                      <AppTextField
                        v-model="giftCardFormData.email"
                        label="E-mail"
                        :rules="[requiredValidator(giftCardFormData.email, 'E-mail')]"
                      />
                    </VCol>
                  </VRow>

                  <VRow>
                    <VCol
                      md="6"
                      cols="6"
                    >
                      <AppTextField
                        v-model="giftCardFormData.cpfCnpj"
                        v-mask="'###.###.###-##'"
                        label="CPF / CNPJ"
                        :rules="[requiredValidator(giftCardFormData.cpfCnpj, 'CPF')]"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="6"
                    >
                      <AppTextField
                        v-model="giftCardFormData.celular"
                        v-mask="'(##) #####-####'"
                        label="Celular"
                        :rules="[requiredValidator(giftCardFormData.celular, 'celular')]"
                      />
                    </VCol>
                  </VRow>
                </VCol>
              </div>
            </div>

            <div class="painel v2">
              <div class="label-painel">
                <span class="font-black bg-primary">2</span>
                <h6 class="font-bold marginless paddingless bg-primary">
                  DADOS DE ENTREGA
                </h6>
              </div>

              <div class="row">
                <VCol
                  class="mb-4"
                  outlined
                >
                  <VRow>
                    <!-- 👉 Cep -->
                    <VCol
                      md="8"
                      cols="12"
                    >
                      <AppTextField
                        v-model="giftCardFormData.cep"
                        v-mask="['#####-###', '#####']"
                        clearable
                        :label="$t('Zip code')"
                        :rules="[requiredValidator(giftCardFormData.cep, $t('Zip code'))]"
                        type="text"
                        class="textfield-demo-icon-slot"
                      >
                        <!-- AppendInner -->
                        <template #append-inner>
                          <VFadeTransition leave-absolute>
                            <VProgressCircular
                              v-if="loading"
                              color="primary"
                              indeterminate
                            />
                          </VFadeTransition>
                        </template>

                        <!-- Append -->
                        <template #append>
                          <VBtn

                            @click="clickMe"
                          >
                            <VIcon
                              icon="tabler-search"
                            />
                          </VBtn>
                        </template>
                      </AppTextField>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <AppTextField
                        v-model="giftCardFormData.endereco"
                        label="Endereço"
                        :rules="[requiredValidator(giftCardFormData.endereco, 'Endereço')]"
                        disabled="true"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="6">
                      <AppTextField
                        v-model="giftCardFormData.numero"
                        label="Número"
                        maxlength="6"
                        :rules="[requiredValidator(giftCardFormData.numero, 'N°')]"
                        @input="numericInput"
                      />
                    </VCol>
                    <VCol cols="6">
                      <AppTextField
                        v-model="giftCardFormData.bairro"
                        label="Bairro"
                        :rules="[requiredValidator(giftCardFormData.bairro, 'Bairro')]"
                        disabled="true"
                      />
                    </VCol>
                  </VRow>

                  <VRow>
                    <VCol cols="12">
                      <AppTextField
                        v-model="giftCardFormData.complemento"
                        label="Complemento"
                      />
                    </VCol>
                  </VRow>

                  <VRow>
                    <VCol cols="6">
                      <AppTextField
                        v-model="giftCardFormData.cidade"
                        label="Cidade"
                        :rules="[requiredValidator]"
                        disabled="true"
                      />
                    </VCol>
                    <VCol cols="6">
                      <AppTextField
                        v-model="giftCardFormData.estado"
                        label="Estado"
                        :rules="[requiredValidator]"
                        disabled="true"
                      />
                    </VCol>
                  </VRow>
                </VCol>
              </div>
            </div>
          </div>

          <div
            class="v-col-sm-6"
          >
            <div class="painel v2">
              <div class="label-painel">
                <span class="font-black bg-primary">3</span>
                <h6 class="font-bold marginless paddingless bg-primary">
                  DADOS DE PAGAMENTO
                </h6>
              </div>

              <div class="row">
                <!-- 👉 Payment method tabs -->

                <VCol
                  class="mb-6"
                >
                  <h5>
                    PAGAR COM:
                  </h5>
                  <H7>
                    Escolha qual método de pagamento você prefere usar.
                  </H7>
                </VCol>

                <VRow class="text-center justify-center">
                  <div
                    v-for="(item, index) in paymentMethods"
                    :key="index"
                    :color="selectedPaymentMethod === index ? 'primary' : ''"
                    class="mr-2 d-flex"

                    @click="selectPaymentMethod(index)"
                  >
                    <VBadge
                      v-show="selectedPaymentMethod === index"

                      location="bottom top"
                      offset-x="3"
                      offset-y="3"
                      bordered
                      icon="mdi-check"
                      overlap
                      color="success"
                    >
                      <VBtn
                        :color="selectedPaymentMethod === index ? 'primary' : ''"
                        class="mr-2 d-flex  "
                        style="font-size: 11px"
                        @click="selectPaymentMethod(index)"
                      >
                        <VIcon>   {{ item.icon }}</VIcon>    {{ item.name }}
                      </VBtn>
                    </VBadge>
                    <VBtn
                      v-show="selectedPaymentMethod !== index"
                      :color="selectedPaymentMethod !== index ? 'white' : ''"
                      style="font-size: 11px"
                      @click="selectPaymentMethod(index)"
                    >
                      <VIcon>   {{ item.icon }}</VIcon>
                      {{ item.name }}
                    </VBtn>
                  </div>
                </VRow>
                <div class="mt-14">
                  <div v-if="selectedPaymentMethod !== null && selectedPaymentMethod === 0">
                    <VCol cols="12">
                      <h3>
                        DADOS DO CARTÃO
                      </h3>
                    </VCol>

                    <!-- 👉 Saved Cards -->
                    <!--                  <pre> -->
                    <!--                        {{ cardFormData }} -->
                    <!--                      </pre> -->
                    <VCol
                      cols="12"
                    >
                      <Vuecreditcard

                        v-model:value="cardFormData"
                        :validation-function="requiredValidator"
                      />
                    </VCol>
                  </div>
                  <div v-else-if="selectedPaymentMethod !== null && selectedPaymentMethod === 1">
                    <p
                      class="text-base text-high-emphasis"
                    >
                      <VIcon icon="tabler-info-circle" /> Atenção a estes detalhes:
                    </p>

                    <ul class="text-base text-high-emphasis">
                      <li>
                        <VIcon icon="tabler-circle-check" /> Apenas à vista;
                      </li>
                      <li>
                        <VIcon icon="tabler-circle-check" /> Os pagamentos levam até 3 dias úteis para serem compensados e então terem os produtos liberados;
                      </li>
                      <li>
                        <VIcon icon="tabler-circle-check" /> Fique atento(a) à data de vencimento. Pode pagar em qualquer banco ou casa lotérica até o vencimento.
                      </li>
                    </ul>
                    <br>
                    <p class="text-center">
                      Promoção valida somente no Brasil! Compras realizadas no cartão de crédito e PIX são enviadas em até 24 hrs úteis. Compras realizadas no boleto são enviadas após 3 dias úteis.
                    </p>
                  </div>
                  <div v-else-if=" selectedPaymentMethod !== null && selectedPaymentMethod === 2">
                    <h6 class="text-base font-weight-medium mb-4">
                      <VIcon icon="tabler-info-circle" />     Atenção a estes detalhes:
                    </h6>

                    <ul class="text-base text-high-emphasis">
                      <li>
                        <VIcon icon="tabler-circle-check" /> Apenas à vista;
                      </li>
                      <li>
                        <VIcon icon="tabler-circle-check" /> O(s) produto(s) será(ão) liberado(s) somente após recebermos a confirmação de pagamento;
                      </li>
                      <li>
                        <VIcon icon="tabler-circle-check" /> Fique atento(a) à data de vencimento. Após a expiração, será necessário refazer seu pedido.
                      </li>
                    </ul>
                    <br>
                    <p class="text-center">
                      Promoção valida somente no Brasil! Compras realizadas no cartão de crédito e PIX são enviadas em até 24 hrs úteis. Compras realizadas no boleto são enviadas após 3 dias úteis.
                    </p>
                  </div>
                </div>
                <!-- 👉 comprar agora -->

                <VDivider />
                <div class="mt-12">
                  <VBtn
                    block
                    :loading="checkoutStore.loading"
                    :disabled="!validateFields()"
                    type="submit"

                    @click="refForm?.validate() && onSubmit()"
                  >
                    Comprar Agora
                  </VBtn>
                </div>

                <p class="text-compra-segura">
                  Ambiente criptografado e 100% seguro.
                </p>

                <div class="wrapper-selos">
                  <img
                    class="lazy img-responsive compra-segura loaded"
                    style="width: auto;"

                    src="@/assets/images/compra-segura.png"
                  >
                </div>
              </div>
            </div>
          </div>
        </VRow>
        <VRow>
          <!-- 👉 Delivery address -->
          <div class="v-col-sm-12">
            <div class="painel v2">
              <div class="label-painel2">
                <span class="font-black bg-primary">
                  <VIcon
                    style="margin-right: 10px;"
                    icon="tabler-shopping-cart"
                  />

                </span>
                <h6 class="font-bold marginless paddingless bg-primary">
                  VOCÊ ESTÁ COMPRANDO
                </h6>
              </div>
              <div class="faixa-seguranca">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 22 26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.284 5.3s3.65 16.194-10.176 20.243C-2.718 21.494.93 5.3.93 5.3L11.108.644 21.284 5.3zM10.605 18.67l6.42-6.378-1.764-1.751-4.656 4.626-3.124-3.104-1.763 1.751 4.887 4.856z"
                    fill="#fff"
                  />
                </svg>
                <span class="">Compra 100% Segura</span>
              </div>
            </div>
          </div>
        </VRow>
      </VForm>
    </div>
  </VMain>
</template>

<style lang="scss" scoped>
.faixa-segurança::before {
  position: absolute;
  content: " ";
  right: 0px;
  bottom: -10px;
  display: block;
  border-left-width: 0px;
  border-right-width: 10px;
  border-top-width: 10px;
  border-style: solid solid solid;
  border-color: transparent transparent;
  border-bottom: 10px;
}
.faixa-seguranca {
  background-color: rgb(124, 208, 99);
  z-index: 1;
  color: rgb(255, 255, 255);
  font-size: 11px;
  top: -3px;
  right: -23px;
  text-transform: uppercase;
  font-weight: 700;
  position: absolute;
  max-width: 215px;
  padding: 7px 12px 7px 13px;
}
span.v-badge__badge.v-theme--light.bg-success {
  bottom: unset !important;
  bottom: calc(100% - 30px);
}
.v-badge__badge.v-theme--light.bg-success:not(.v-tab--active) {
  bottom: calc(100% - 30px) !important;
}

.v-badge__badge.v-theme--light.bg-success[style*="display: none;"] {
  display: inline-block !important;
}

/* Estilo adicional para ajustar o posicionamento quando o VBadge não está ativo */
.v-tab {
  position: relative;
}

/* Estilo para ajustar o posicionamento do VBadge quando não está ativo */
.span.v-badge__badge.v-theme--light.bg-success[style*="display: none;"] {
  position: absolute !important;
  bottom: calc(100% - 30px) !important;
}

.textfield-demo-icon-slot .v-messages {
  margin-top: -8px; /* Ajuste conforme necessário */
}
.paddingless {
  padding: 0!important;
}
.container {
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
}

.wrapper-selos {
  display: flex;
  justify-content: center;
  gap: 14px;
  align-items: center;
  width: auto;
}
.text-compra-segura {
  margin-top: 10px;
  color: #6f6f6f;
  font-size: 11px;
}
.painel.v2 {
  padding: 38px 24px 18px 24px;
  margin-top: 30px;
}
.painel {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-top: 25px;
  box-shadow: 4px 2px 7px rgba(0,0,0,.05);
  padding: 15px 12px;
  position: relative;
}
.label-painel h6 {
  background: #d5d5d5;
  display: inline-block;
  padding: 5px 14px 7px 30px !important;
  border-radius: 300px;
  color: #fff;
  margin-left: 18px !important;
}
.label-painel2 h6 {
  background: #d5d5d5;
  display: inline-block;
  padding: 5px 14px 7px 30px !important;
  border-radius: 300px;
  color: #fff;
  margin-left: 18px !important;
}
.label-painel {
  position: absolute;
  top: -10px;
  left: 10px;
  z-index: 10;
}
.label-painel2 {
  position: absolute;
  top: -10px;
  left: 10px;
  z-index: 10;
}
.label-painel span {
  color: #fff;
  background: #b8b8b8;
  padding: 3px 14px;
  border-radius: 307px;
  position: absolute;
  font-size: 22px;
  line-height: 36px;
  top: -8px;
  width: 42px;
  height: 42px;
  text-align: center;
}
.label-painel2 span {
  color: #fff;
  background: #b8b8b8;
  padding: 2px 5px;
  border-radius: 307px;
  position: absolute;
  font-size: 22px;
  line-height: 36px;
  top: -8px;
  width: 42px;
  height: 42px;
  text-align: center;
}
.paddingless {
  padding: 0!important;
}
.marginless {
  margin: 0!important;
}
</style>

<route lang="yaml">
name: checkout.buy
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: false
</route>
