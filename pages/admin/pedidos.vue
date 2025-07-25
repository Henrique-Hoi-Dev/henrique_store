<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Pedidos</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">#ID</th>
            <th class="px-4 py-2 text-left">Cliente</th>
            <th class="px-4 py-2 text-left">Valor</th>
            <th class="px-4 py-2 text-left">Status</th>
            <th class="px-4 py-2 text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pedido in pedidos"
            :key="pedido.id"
            class="border-t border-gray-200 dark:border-gray-700"
          >
            <td class="px-4 py-2 font-mono">{{ pedido.id }}</td>
            <td class="px-4 py-2">{{ pedido.cliente }}</td>
            <td class="px-4 py-2">R$ {{ pedido.valor.toFixed(2) }}</td>
            <td class="px-4 py-2">
              <span
                :class="statusClass(pedido.status)"
                class="px-2 py-1 rounded text-xs font-semibold"
              >
                {{ pedido.status }}
              </span>
            </td>
            <td class="px-4 py-2">{{ pedido.data }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const pedidos = [
  {
    id: 101,
    cliente: 'João Silva',
    valor: 199.9,
    status: 'aguardando',
    data: '2024-06-01',
  },
  {
    id: 102,
    cliente: 'Maria Souza',
    valor: 349.5,
    status: 'pago',
    data: '2024-06-02',
  },
  {
    id: 103,
    cliente: 'Carlos Lima',
    valor: 120.0,
    status: 'enviado',
    data: '2024-06-03',
  },
  {
    id: 104,
    cliente: 'Ana Paula',
    valor: 89.9,
    status: 'aguardando',
    data: '2024-06-04',
  },
];

function statusClass(status) {
  switch (status) {
    case 'aguardando':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200';
    case 'pago':
      return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200';
    case 'enviado':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}
</script>
