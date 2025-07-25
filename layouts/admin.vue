<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="flex w-64 flex-col bg-white shadow-lg">
      <div
        class="flex h-16 items-center justify-center border-b border-gray-200"
      >
        <span class="text-primary-600 text-xl font-bold">Admin</span>
      </div>
      <nav class="flex-1 space-y-2 px-4 py-6">
        <NuxtLink
          to="/admin"
          class="hover:bg-primary-100 block rounded px-3 py-2 font-medium"
          active-class="bg-primary-100"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          to="/admin/pedidos"
          class="hover:bg-primary-100 block rounded px-3 py-2 font-medium"
          active-class="bg-primary-100"
          >Pedidos</NuxtLink
        >
        <NuxtLink
          to="/admin/produtos"
          class="hover:bg-primary-100 block rounded px-3 py-2 font-medium"
          active-class="bg-primary-100"
          >Produtos</NuxtLink
        >
      </nav>
      <div class="border-t border-gray-200 p-4">
        <button
          @click="logout"
          class="w-full rounded bg-red-600 px-3 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </aside>
    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useAdminAuth } from "~/stores/adminAuth";
const { logout } = useAdminAuth();
</script>
