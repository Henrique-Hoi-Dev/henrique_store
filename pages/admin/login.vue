<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div
      class="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow-lg"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-primary-600">
        Login Admin
      </h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">E-mail</label>
          <input
            v-model="email"
            type="email"
            required
            class="input-field w-full"
            placeholder="admin@admin.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Senha</label>
          <input
            v-model="password"
            type="password"
            required
            class="input-field w-full"
            placeholder="admin123"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 rounded bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
        >
          Entrar
        </button>
        <p v-if="error" class="text-red-600 text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useAdminAuth } from '~/stores/adminAuth';
const { login, error, isAuthenticated } = useAdminAuth();
const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  const result = await login({ email: email.value, password: password.value });
  if (result.success) {
    router.push('/admin');
  }
};
if (isAuthenticated) router.push('/admin');
</script>
