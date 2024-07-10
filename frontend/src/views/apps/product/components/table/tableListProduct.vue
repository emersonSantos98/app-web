<script setup lang="ts">
import { VAvatar, VCard, VCardText, VIcon, VTable } from 'vuetify/components'
import { ref, watchEffect } from 'vue'
import type { Product } from '../../types'
import { tableListProductStore } from '././tableListProductStore'

const products = ref<Product[]>([])
const store = tableListProductStore()

store.fetchTableData()

watchEffect(() => {
  products.value = store.tableProduct
})
</script>

<template>
  <VCard class="mb-6 mt-4">
    <VCardText>
      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th>
              Produto
            </th>
            <th>
              preço de venda
            </th>
            <th>
              Estoque
            </th>
            <th>
               data de cadastro
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in products"
            :key="item.id"
          >
            <td>
              <VAvatar
                size="26"
                color="success"
                variant="tonal"
              >
                <VIcon
                  size="20"
                  color="success"
                  class="rounded-0"
                >
                  tabler-box-seam
                </VIcon>
              </VAvatar>
              <span class="ms-1 text-no-wrap"> {{ item.name_product }}</span>
            </td>
            <Td>
              <VAvatar
                size="26"
                color="success"
                variant="tonal"
              >
                <VIcon
                  size="20"
                  color="success"
                  class="rounded-0"
                >
                  tabler-currency-real
                </VIcon>
              </VAvatar>
              <span class="ms-1 text-no-wrap"> {{ item.total_cost }}</span>
            </Td>
            <Td>
              <VAvatar
                size="26"
                color="success"
                variant="tonal"
              >
                <VIcon
                  size="20"
                  color="success"
                  class="rounded-0"
                >
                  tabler-packages
                </VIcon>
              </VAvatar>
              <span class="ms-1 text-no-wrap"> {{ item.generalStock }}</span>
            </Td>
            <Td>
              <VAvatar
                size="26"
                color="success"
                variant="tonal"
              >
                <VIcon
                  size="20"
                  color="success"
                  class="rounded-0"
                >
                  tabler-calendar-week
                </VIcon>
              </VAvatar>
              <span class="ms-1 text-no-wrap"> {{ item.created_at }}</span>
            </Td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>
