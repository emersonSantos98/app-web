<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import CardViewDetails from "@/views/apps/product/view/details/cardViewDetails.vue";

const route = useRoute('product-details-id')

watchEffect(async () => {
  console.log('route', route.params.id)
})
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <div class="demo-space-x">
      <VBtn
        color="primary"
        :to="{ name: 'product' }"
      >
        <VIcon
          start
          icon="tabler-arrow-back-up"
        />
        Voltar
      </VBtn>
    </div>
    <card-view-details />
  </div>
</template>

<style scoped lang="scss">

</style>

<route lang="yaml">
meta:
  action: read
  subject: Auth
</route>
