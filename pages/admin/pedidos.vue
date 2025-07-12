<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Pedidos</h1>
    <table class="min-w-full bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Cliente</th>
          <th class="px-4 py-2 text-left">Valor</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="pedido in pedidos"
          :key="pedido.id"
          class="border-t border-gray-200 dark:border-gray-700"
        >
          <td class="px-4 py-2">{{ pedido.id }}</td>
          <td class="px-4 py-2">{{ pedido.cliente }}</td>
          <td class="px-4 py-2">R$ {{ pedido.valor.toFixed(2) }}</td>
          <td class="px-4 py-2">
            <span :class="statusClass(pedido.status)">{{ pedido.status }}</span>
          </td>
          <td class="px-4 py-2">
            <button class="text-primary-600 hover:underline">Ver</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' });
const pedidos = ref([
  { id: 1, cliente: 'João Silva', valor: 299.99, status: 'aguardando' },
  { id: 2, cliente: 'Maria Souza', valor: 499.9, status: 'pago' },
  { id: 3, cliente: 'Carlos Lima', valor: 129.5, status: 'enviado' },
]);
const statusClass = (status) => {
  if (status === 'pago') return 'text-green-600 font-bold';
  if (status === 'enviado') return 'text-blue-600 font-bold';
  return 'text-yellow-600 font-bold';
};
</script>
