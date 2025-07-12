<template>
  <div class="min-h-screen flex bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
      <div
        class="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700"
      >
        <span class="text-xl font-bold text-primary-600">Admin</span>
      </div>
      <nav class="flex-1 py-6 px-4 space-y-2">
        <NuxtLink
          to="/admin"
          class="block py-2 px-3 rounded hover:bg-primary-100 dark:hover:bg-primary-900/30 font-medium"
          active-class="bg-primary-100 dark:bg-primary-900/40"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          to="/admin/pedidos"
          class="block py-2 px-3 rounded hover:bg-primary-100 dark:hover:bg-primary-900/30 font-medium"
          active-class="bg-primary-100 dark:bg-primary-900/40"
          >Pedidos</NuxtLink
        >
        <NuxtLink
          to="/admin/produtos"
          class="block py-2 px-3 rounded hover:bg-primary-100 dark:hover:bg-primary-900/30 font-medium"
          active-class="bg-primary-100 dark:bg-primary-900/40"
          >Produtos</NuxtLink
        >
      </nav>
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          @click="logout"
          class="w-full py-2 px-3 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Sair
        </button>
      </div>
    </aside>
    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useAdminAuth } from '~/stores/adminAuth';
const { logout } = useAdminAuth();
</script>
