import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import Notifier from '@core/utils/Notifier'
import { useAppLayoutStore } from '@/store/appLayout'
import { checkout } from '@/api/PagarMe/pagarMe.client'
import { findCep } from '@/api/ViaCep/viaCep.client'
import { clearCaracters } from '@/@core/utils/helpers'

const notifier = new Notifier()
const appLayout = useAppLayoutStore()

export const useCheckoutStore = defineStore('CheckoutStore', {

  state: () => ({
    loading: false,
  }),

  actions: {
    // 👉 Fetch users data
    async create(data: any) {
      try {
        this.loading = true

        // appLayout.setLoading(true)

        // appLayout.setLoading(true)

        const response = await checkout(data)

        console.log(response, 'response status')
        console.log(response.status, 'response status 2')

        if (response.status === 202) {
          // notifier.success('Checkout created successfully.')
          this.loading = false

          Swal.fire({
            title: 'Sucesso!',
            text: 'Seu pedido foi realizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          })

          //  appLayout.setLoading(false)

          // appLayout.setLoading(false)
        }

        else {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao efetuar a compra, verifique os dados e tente novamente!',
            icon: 'warning',
            confirmButtonText: 'Ok',
          })
          this.loading = false
        }
      }
      catch (err) {
        this.loading = false

        Notifier.error(`Erro ao atualizar o perfil ${err.message}`)
      }
    },

    async findCep(cep: string) {
      cep = clearCaracters(cep)
      try {
        this.loading = true

        const response = await findCep(cep)

        this.loading = false

        return response.data
      }
      catch (err) {
        throw new Error(err.message)
      }
    },
  },
})
