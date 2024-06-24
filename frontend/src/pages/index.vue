<script>
export default {
  data() {
    return {
      programaFreteGratis: 'sim',
      comissao: 14,
      aliquotaImposto: 10,
      custoProduto: 20,
      margemLucro: 17,
      outrasTaxasVenda: 0,
      prazoPagamentoFornecedor: 0,
      tempoEstoque: 0,
      tempoRepasse: 0,
      precoVenda: null,
      lucroNominal: null,
      capitalGiro: null,
    }
  },
  // eslint-disable-next-line vue/component-api-style
  methods: {
    primeiraCalculo(valor) {
      return valor / (1 - this.aliquotaImposto / 100 - this.comissao / 100 - this.margemLucro / 100 - this.outrasTaxasVenda / 100 - 0.5)
    },
    segundaCalculo(valor) {
      return (valor + 3) / (1 - this.aliquotaImposto / 100 - this.comissao / 100 - this.margemLucro / 100 - this.outrasTaxasVenda / 100)
    },
    terceiraCalculo(valor) {
      return (valor + 3 + 100) / (1 - this.aliquotaImposto / 100 - this.margemLucro / 100 - this.outrasTaxasVenda / 100)
    },
    quartaCalculo(valor) {
      return (valor + 3) / (1 - this.aliquotaImposto / 100 - this.comissao / 100 - this.margemLucro / 100 - 0.06 - this.outrasTaxasVenda / 100)
    },
    quintaCalculo(valor) {
      return (valor + 3 + 100) / (1 - this.aliquotaImposto / 100 - this.margemLucro / 100 - this.outrasTaxasVenda / 100)
    },
    calcularValores() {
      const custoTotalProduto = this.custoProduto
      const programaFreteGratis = this.programaFreteGratis.toLowerCase()
      const comissao = this.comissao / 100

      let precoVenda

      if (this.primeiraCalculo(custoTotalProduto) < 6) {
        if (this.primeiraCalculo(custoTotalProduto) >= 0) {
          precoVenda = this.primeiraCalculo(custoTotalProduto)
        }
        else if (programaFreteGratis === 'nao') {
          if (this.segundaCalculo(custoTotalProduto) * comissao <= 100)
            precoVenda = this.segundaCalculo(custoTotalProduto)
          else
            precoVenda = this.terceiraCalculo(custoTotalProduto)
        }
        else {
          if (this.quartaCalculo(custoTotalProduto) * comissao <= 100)
            precoVenda = this.quartaCalculo(custoTotalProduto)
          else
            precoVenda = this.quintaCalculo(custoTotalProduto)
        }
      }
      else {
        if (programaFreteGratis === 'nao') {
          if (this.segundaCalculo(custoTotalProduto) * comissao <= 100)
            precoVenda = this.segundaCalculo(custoTotalProduto)
          else
            precoVenda = this.terceiraCalculo(custoTotalProduto)
        }
        else {
          if (this.quartaCalculo(custoTotalProduto) * comissao <= 100)
            precoVenda = this.quartaCalculo(custoTotalProduto)
          else
            precoVenda = this.quintaCalculo(custoTotalProduto)
        }
      }

      const margemLucro = this.margemLucro / 100

      this.precoVenda = precoVenda
      this.lucroNominal = precoVenda * margemLucro
      this.capitalGiro = (custoTotalProduto / 30) * this.tempoEstoque - (custoTotalProduto / 30) * this.prazoPagamentoFornecedor - (precoVenda / 30) * this.tempoRepasse
    },
  },
}
</script>

<template>
  <div>
    <h1>Calculadora de Preço Shopee</h1>
    <form @submit.prevent="calcularValores">
      <div>
        <label>Faz parte do Programa de Frete Grátis?</label>
        <select v-model="programaFreteGratis">
          <option value="sim">
            Sim
          </option>
          <option value="nao">
            Não
          </option>
        </select>
      </div>
      <div>
        <label>Qual é a sua comissão? (%)</label>
        <input
          v-model.number="comissao"
          type="number"
          step="0.01"
          required
        >
        <p>Comissão padrão Shopee, não é preciso adicionar os percentuais referentes ao programa de frete grátis</p>
      </div>
      <div>
        <label>Qual é a alíquota de imposto sobre a venda? (%)</label>
        <input
          v-model.number="aliquotaImposto"
          type="number"
          step="0.01"
          required
        >
        <p>Converse com o seu contador em caso de dúvidas</p>
      </div>
      <div>
        <label>Qual o custo total do produto? (R$)</label>
        <input
          v-model.number="custoProduto"
          type="number"
          step="0.01"
          required
        >
      </div>
      <div>
        <label>Qual é a margem de lucro que você quer ter na venda? (%)</label>
        <input
          v-model.number="margemLucro"
          type="number"
          step="0.01"
          required
        >
        <p>Não confundir margem de lucro com mark-up! Ou seja, esse valor jamais ultrapassará os 100% do preço de venda, pois há outros atributos a serem considerados, como impostos, comissões, etc.</p>
      </div>
      <div>
        <label>Outras taxas de venda (R$)</label>
        <input
          v-model.number="outrasTaxasVenda"
          type="number"
          step="0.01"
          required
        >
        <p>(Tarifa de antecipação, etc)</p>
      </div>
      <div>
        <label>Prazo de pagamento médio com fornecedor (%)</label>
        <input
          v-model.number="prazoPagamentoFornecedor"
          type="number"
          step="0.01"
          required
        >
      </div>
      <div>
        <label>Tempo médio de estoque do produto (dias)</label>
        <input
          v-model.number="tempoEstoque"
          type="number"
          required
        >
      </div>
      <div>
        <label>Tempo de repasse (Consulte a política de repasses da Shopee)</label>
        <input
          v-model.number="tempoRepasse"
          type="number"
          required
        >
      </div>
      <button type="submit">
        Calcular
      </button>
    </form>
    <div v-if="precoVenda !== null">
      <h2>Preço de Venda a Ser Praticado: R$ {{ precoVenda.toFixed(2) }}</h2>
      <h2>Lucro Nominal: R$ {{ lucroNominal.toFixed(2) }}</h2>
      <h2>Capital de Giro: R$ {{ capitalGiro.toFixed(2) }}</h2>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
</route>
