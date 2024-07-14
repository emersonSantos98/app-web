<script setup lang="ts">
import TableListProduct from '@/views/apps/product/components/table/tableListProduct.vue'
import AddProduct from '@/views/apps/product/components/dialogs/AddProduct.vue'
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <div class="demo-space-x">
      <AddProduct />
    </div>
    <TableListProduct />
  </div>
</template>

<style scoped lang="scss">

</style>

<route lang="yaml">
meta:
  action: read
  subject: Auth
</route>
