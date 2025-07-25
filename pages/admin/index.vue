<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <!-- Estatísticas de Vendas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center"
      >
        <span class="text-3xl font-bold text-primary-600">R$ 12.340,00</span>
        <span class="text-gray-500 mt-2">Total de Vendas</span>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center"
      >
        <span class="text-3xl font-bold text-primary-600">87</span>
        <span class="text-gray-500 mt-2">Pedidos</span>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center"
      >
        <span class="text-3xl font-bold text-primary-600">{{
          stats.total
        }}</span>
        <span class="text-gray-500 mt-2">Produtos</span>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center"
      >
        <span class="text-3xl font-bold text-primary-600">R$ 142,00</span>
        <span class="text-gray-500 mt-2">Ticket Médio</span>
      </div>
    </div>

    <!-- Sincronização de Produtos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Sincronização de Produtos</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span>Produtos Sincronizados:</span>
            <span class="font-bold text-green-600">{{ stats.synced }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Produtos Manuais:</span>
            <span class="font-bold text-blue-600">{{ stats.manual }}</span>
          </div>
          <button
            @click="syncProducts"
            :disabled="loading"
            class="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            <span v-if="loading">Sincronizando...</span>
            <span v-else>Sincronizar Agora</span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Última Sincronização</h2>
        <div v-if="lastSync" class="space-y-2">
          <div class="flex justify-between">
            <span>Status:</span>
            <span
              :class="lastSync.success ? 'text-green-600' : 'text-red-600'"
              class="font-semibold"
            >
              {{ lastSync.success ? 'Sucesso' : 'Falha' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>Data:</span>
            <span>{{ formatDate(lastSync.timestamp) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Produtos:</span>
            <span>{{ lastSync.count || 0 }}</span>
          </div>
        </div>
        <div v-else class="text-gray-500">Nenhuma sincronização registrada</div>
      </div>
    </div>

    <!-- Resumo de Vendas -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Resumo de vendas (mock)</h2>
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li class="py-2 flex justify-between">
          <span>Hoje</span>
          <span class="font-bold">R$ 1.200,00</span>
        </li>
        <li class="py-2 flex justify-between">
          <span>Ontem</span>
          <span class="font-bold">R$ 980,00</span>
        </li>
        <li class="py-2 flex justify-between">
          <span>Esta semana</span>
          <span class="font-bold">R$ 5.600,00</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { fetchProducts, syncProducts, stats, loading } = useProducts();

const lastSync = ref(null);

onMounted(async () => {
  await fetchProducts();
  await loadLastSync();
});

async function loadLastSync() {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const logPath = path.join(process.cwd(), 'data', 'sync-logs.json');

    const logData = await fs.readFile(logPath, 'utf-8');
    const logs = JSON.parse(logData);

    if (logs.length > 0) {
      lastSync.value = logs[logs.length - 1];
    }
  } catch (error) {
    console.log('Nenhum log de sincronização encontrado');
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('pt-BR');
}
</script>
