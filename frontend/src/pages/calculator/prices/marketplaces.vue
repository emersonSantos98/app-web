<script setup lang="ts">
import CalculatorShopee from '@/views/apps/calculator/view/calculatorShopee.vue'
</script>

<template>
  <div>
    <CalculatorShopee />
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
</route>
