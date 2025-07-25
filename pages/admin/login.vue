<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"
  >
    <form
      @submit.prevent="handleLogin"
      class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <h1 class="text-2xl font-bold mb-6 text-center">Login Admin</h1>
      <div class="mb-4">
        <label class="block mb-1 font-medium" for="email">E-mail</label>
        <input
          v-model="email"
          id="email"
          type="email"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium" for="password">Senha</label>
        <input
          v-model="password"
          id="password"
          type="password"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          required
        />
      </div>
      <div v-if="error" class="mb-4 text-red-600 text-sm">{{ error }}</div>
      <button
        :disabled="loading"
        type="submit"
        class="w-full py-2 px-4 bg-primary-600 text-white font-semibold rounded hover:bg-primary-700 transition disabled:opacity-50"
      >
        <span v-if="loading">Entrando...</span>
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAdminAuth } from '~/stores/adminAuth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const { login, error, loading, isAuthenticated } = useAdminAuth();
const router = useRouter();

async function handleLogin() {
  const result = await login({ email: email.value, password: password.value });
  if (result.success) {
    router.push('/admin');
  }
}
</script>
