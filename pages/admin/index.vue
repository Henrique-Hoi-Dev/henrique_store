<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded shadow p-6">
        <div class="text-3xl font-bold text-primary-600 mb-2">R$ 12.340,00</div>
        <div class="text-gray-600">Total em vendas</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-6">
        <div class="text-3xl font-bold text-primary-600 mb-2">34</div>
        <div class="text-gray-600">Pedidos</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-6">
        <div class="text-3xl font-bold text-primary-600 mb-2">6</div>
        <div class="text-gray-600">Produtos</div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' });
</script>
