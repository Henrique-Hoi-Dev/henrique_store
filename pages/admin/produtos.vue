<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Produtos</h1>
      <div class="flex gap-2">
        <button
          @click="syncProducts"
          :disabled="loading"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold disabled:opacity-50"
        >
          <span v-if="loading">Sincronizando...</span>
          <span v-else>Sincronizar</span>
        </button>
        <NuxtLink
          to="/admin/produtos/novo"
          class="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition font-semibold"
          >Novo Produto</NuxtLink
        >
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div class="text-2xl font-bold text-primary-600">{{ stats.total }}</div>
        <div class="text-gray-500">Total de Produtos</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div class="text-2xl font-bold text-green-600">{{ stats.synced }}</div>
        <div class="text-gray-500">Sincronizados</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div class="text-2xl font-bold text-blue-600">{{ stats.manual }}</div>
        <div class="text-gray-500">Manuais</div>
      </div>
    </div>

    <!-- Lista de Produtos -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">Nome</th>
            <th class="px-4 py-2 text-left">Preço</th>
            <th class="px-4 py-2 text-left">Estoque</th>
            <th class="px-4 py-2 text-left">Origem</th>
            <th class="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="produto in produtos"
            :key="produto.id"
            class="border-t border-gray-200 dark:border-gray-700"
          >
            <td class="px-4 py-2">{{ produto.name }}</td>
            <td class="px-4 py-2">
              R$ {{ produto.price?.toFixed(2) || produto.preco?.toFixed(2) }}
            </td>
            <td class="px-4 py-2">{{ produto.stock || produto.estoque }}</td>
            <td class="px-4 py-2">
              <span
                :class="sourceClass(produto.source)"
                class="px-2 py-1 rounded text-xs font-semibold"
              >
                {{ produto.source === 'supplier' ? 'Sincronizado' : 'Manual' }}
              </span>
            </td>
            <td class="px-4 py-2 space-x-2">
              <NuxtLink
                :to="`/admin/produtos/${produto.id}`"
                class="text-blue-600 hover:underline"
                >Editar</NuxtLink
              >
              <button
                @click="excluirProduto(produto.id)"
                class="text-red-600 hover:underline"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mensagem de erro -->
    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { fetchProducts, syncProducts, products, loading, error, stats } =
  useProducts();

onMounted(() => {
  fetchProducts();
});

function sourceClass(source) {
  return source === 'supplier'
    ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200';
}

function excluirProduto(id) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    // Implementar exclusão via API
    console.log('Excluir produto:', id);
  }
}
</script>
