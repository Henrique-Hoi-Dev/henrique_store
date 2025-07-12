<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <div
          class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900"
        >
          <Icon name="heroicons:check" class="h-8 w-8 text-green-600" />
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Compra realizada com sucesso!
        </h2>
        <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Obrigado por escolher a Henrique Store
        </p>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Detalhes do Pedido
        </h3>

        <div class="space-y-3 text-left">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400"
              >Número do Pedido:</span
            >
            <span class="font-medium text-gray-900 dark:text-gray-100">
              #{{ numeroPedido }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Data:</span>
            <span class="font-medium text-gray-900 dark:text-gray-100">
              {{ dataPedido }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Total:</span>
            <span class="font-medium text-gray-900 dark:text-gray-100">
              R$ {{ totalPedido }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Status:</span>
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            >
              Processando
            </span>
          </div>
        </div>
      </div>

      <div
        class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-8"
      >
        <div class="flex">
          <Icon
            name="heroicons:information-circle"
            class="w-5 h-5 text-blue-400"
          />
          <div class="ml-3">
            <p class="text-sm text-blue-800 dark:text-blue-200">
              Você receberá um email com os detalhes do pedido e informações de
              rastreamento.
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <NuxtLink to="/" class="w-full btn-primary">
          Continuar Comprando
        </NuxtLink>

        <NuxtLink to="/perfil/pedidos" class="w-full btn-secondary">
          Ver Meus Pedidos
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const numeroPedido = ref('HS' + Date.now().toString().slice(-6));
const dataPedido = ref(new Date().toLocaleDateString('pt-BR'));
const totalPedido = ref('299,99'); // Valor mockado

// Definir meta para a página
useHead({
  title: 'Compra Realizada - Henrique Store',
});
</script>
