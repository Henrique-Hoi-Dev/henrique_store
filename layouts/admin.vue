<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white dark:bg-gray-800 shadow-sm">
        <div class="p-6">
          <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">
            Admin Panel
          </h1>
        </div>
        <nav class="mt-6">
          <NuxtLink
            to="/admin/dashboard"
            class="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/produtos"
            class="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Produtos
          </NuxtLink>
          <NuxtLink
            to="/admin/pedidos"
            class="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Pedidos
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// Layout para o painel administrativo
</script>
