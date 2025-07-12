<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
      Finalizar Compra
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Formulário de checkout -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Informações de entrega -->
        <div class="card">
          <div class="p-6">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Informações de Entrega
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  CEP
                </label>
                <input
                  v-model="form.cep"
                  type="text"
                  class="input-field"
                  placeholder="00000-000"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Endereço
                </label>
                <input
                  v-model="form.endereco"
                  type="text"
                  class="input-field"
                  placeholder="Rua, número"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Complemento
                </label>
                <input
                  v-model="form.complemento"
                  type="text"
                  class="input-field"
                  placeholder="Apartamento, bloco, etc."
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Bairro
                </label>
                <input
                  v-model="form.bairro"
                  type="text"
                  class="input-field"
                  placeholder="Bairro"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Cidade
                </label>
                <input
                  v-model="form.cidade"
                  type="text"
                  class="input-field"
                  placeholder="Cidade"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Estado
                </label>
                <select v-model="form.estado" class="input-field">
                  <option value="">Selecione</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Informações de pagamento -->
        <div class="card">
          <div class="p-6">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Informações de Pagamento
            </h2>

            <div class="space-y-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Número do Cartão
                </label>
                <input
                  v-model="form.numeroCartao"
                  type="text"
                  class="input-field"
                  placeholder="0000 0000 0000 0000"
                />
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Mês
                  </label>
                  <select v-model="form.mesCartao" class="input-field">
                    <option value="">MM</option>
                    <option
                      v-for="mes in 12"
                      :key="mes"
                      :value="mes.toString().padStart(2, '0')"
                    >
                      {{ mes.toString().padStart(2, '0') }}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Ano
                  </label>
                  <select v-model="form.anoCartao" class="input-field">
                    <option value="">AAAA</option>
                    <option v-for="ano in anosCartao" :key="ano" :value="ano">
                      {{ ano }}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    CVV
                  </label>
                  <input
                    v-model="form.cvv"
                    type="text"
                    class="input-field"
                    placeholder="123"
                    maxlength="4"
                  />
                </div>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nome no Cartão
                </label>
                <input
                  v-model="form.nomeCartao"
                  type="text"
                  class="input-field"
                  placeholder="Nome como está no cartão"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumo do pedido -->
      <div class="lg:col-span-1">
        <div class="card">
          <div class="p-6">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Resumo do Pedido
            </h2>

            <!-- Itens do carrinho -->
            <div class="space-y-3 mb-6">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex justify-between items-center"
              >
                <div class="flex items-center space-x-3">
                  <img
                    :src="item.imagem"
                    :alt="item.nome"
                    class="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">
                      {{ item.nome }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Qtd: {{ item.quantidade }}
                    </p>
                  </div>
                </div>
                <p class="font-medium text-gray-900 dark:text-gray-100">
                  R$ {{ formatPrice(item.preco * item.quantidade) }}
                </p>
              </div>
            </div>

            <!-- Totais -->
            <div
              class="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span class="text-gray-900 dark:text-gray-100">
                  R$ {{ formatPrice(totalPrice) }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Frete:</span>
                <span class="text-gray-900 dark:text-gray-100">
                  {{
                    shipping === 0 ? 'Grátis' : `R$ ${formatPrice(shipping)}`
                  }}
                </span>
              </div>

              <div class="flex justify-between font-semibold text-lg">
                <span class="text-gray-900 dark:text-gray-100">Total:</span>
                <span class="text-gray-900 dark:text-gray-100">
                  R$ {{ formatPrice(total) }}
                </span>
              </div>
            </div>

            <!-- Botão de finalizar -->
            <button
              @click="finalizarCompra"
              :disabled="loading"
              class="w-full btn-primary mt-6"
            >
              <Icon
                v-if="loading"
                name="heroicons:arrow-path"
                class="animate-spin -ml-1 mr-3 h-5 w-5"
              />
              {{ loading ? 'Processando...' : 'Finalizar Compra' }}
            </button>

            <!-- Segurança -->
            <div
              class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md"
            >
              <div class="flex">
                <Icon
                  name="heroicons:shield-check"
                  class="w-5 h-5 text-green-400"
                />
                <div class="ml-3">
                  <p class="text-sm text-green-800 dark:text-green-200">
                    Pagamento 100% seguro
                  </p>
                  <p class="text-xs text-green-600 dark:text-green-300">
                    Seus dados estão protegidos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  items,
  totalPrice,
  calculateSubtotal,
  calculateShipping,
  calculateTotal,
  formatPrice,
  clearCart,
} = useCart();

const form = ref({
  cep: '',
  endereco: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  numeroCartao: '',
  mesCartao: '',
  anoCartao: '',
  cvv: '',
  nomeCartao: '',
});

const loading = ref(false);

const subtotal = computed(() => calculateSubtotal(items.value));
const shipping = computed(() => calculateShipping(subtotal.value));
const total = computed(() => calculateTotal(subtotal.value, shipping.value));

const anosCartao = computed(() => {
  const anoAtual = new Date().getFullYear();
  const anos = [];
  for (let i = 0; i < 10; i++) {
    anos.push(anoAtual + i);
  }
  return anos;
});

const finalizarCompra = async () => {
  loading.value = true;

  try {
    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Limpar carrinho
    clearCart();

    // Redirecionar para página de sucesso
    await navigateTo('/sucesso');
  } catch (error) {
    console.error('Erro ao finalizar compra:', error);
  } finally {
    loading.value = false;
  }
};

// Definir meta para a página
useHead({
  title: 'Checkout - Henrique Store',
});
</script>
