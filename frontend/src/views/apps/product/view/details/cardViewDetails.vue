<script setup lang="ts">
import { ref } from 'vue'
import { VCard, VCardText, VCardTitle, VCol, VExpansionPanel, VExpansionPanelText, VExpansionPanelTitle, VExpansionPanels, VIcon, VRow, VDivider } from 'vuetify/components'

// Simulated product data
const product = ref({
  name_product: "Conjunto Lanzinha plusize",
  description: "Conjunto - tecido lanzinha - grade M - G",
  total_cost: "NaN",
  generalStock: 0,
  created_at: "14 Jul 2024",
  mappedVariations: {
    "Preto": { grade: ["M", "G"], stock: 0, barcode: "", productId: 35 },
    "Azul Marinho": { grade: ["M", "G"], stock: 0, barcode: "", productId: 35 },
    "Laranja Queimado": { grade: ["M", "G"], stock: 0, barcode: "", productId: 35 },
    "Verde Militar": { grade: ["M", "G"], stock: 0, barcode: "", productId: 35 }
  },
  calculations: [
    { id: 17, id_user: 2, id_product: 19, price_sale: "27", nominal_profit: "51", working_capital: "20", date_calculo: "2024-07-06T00:00:00.000Z", createdAt: "2024-07-06T18:26:14.000Z", updatedAt: "2024-07-06T18:26:14.000Z" }
  ]
});
</script>

<template>
  <VCard>
    <VCardTitle>Detalhes do Produto</VCardTitle>
    <VCardText>
      <h2>{{ product.name_product }}</h2>
      <p>{{ product.description }}</p>
      <p><strong>Total Cost:</strong> {{ product.total_cost }}</p>
      <p><strong>General Stock:</strong> {{ product.generalStock }}</p>
      <p><strong>Created At:</strong> {{ product.created_at }}</p>
    </VCardText>

    <VDivider class="my-4" />

    <VCardText>
      <h2>Variações</h2>
      <VExpansionPanels multiple>
        <VExpansionPanel
          v-for="(details, color) in product.mappedVariations"
          :key="color"
        >
          <VExpansionPanelTitle>{{ color }}</VExpansionPanelTitle>
          <VExpansionPanelText>
            <p><strong>Grade:</strong> {{ details.grade.join(', ') }}</p>
            <p><strong>Stock:</strong> {{ details.stock }}</p>
            <p><strong>Barcode:</strong> {{ details.barcode }}</p>
            <p><strong>Product ID:</strong> {{ details.productId }}</p>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCardText>

    <VDivider class="my-4" />

    <VCardText>
      <h2>Calculations</h2>
      <div v-for="calc in product.calculations" :key="calc.id" class="calculation-item">
        <p><strong>Price Sale:</strong> {{ calc.price_sale }}</p>
        <p><strong>Nominal Profit:</strong> {{ calc.nominal_profit }}</p>
        <p><strong>Working Capital:</strong> {{ calc.working_capital }}</p>
        <p><strong>Date:</strong> {{ new Date(calc.date_calculo).toLocaleDateString() }}</p>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f9f9f9;
}

.product-details {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.calculation-item {
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
