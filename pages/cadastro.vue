<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100"
        >
          Criar conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Ou
          <NuxtLink
            to="/login"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            faça login na sua conta
          </NuxtLink>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <!-- Nome e Sobrenome -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="nome"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nome
              </label>
              <input
                id="nome"
                v-model="form.nome"
                type="text"
                required
                class="input-field mt-1"
                :class="{ 'border-red-500': errors.nome }"
                placeholder="Seu nome"
              />
              <p v-if="errors.nome" class="mt-1 text-sm text-red-600">
                {{ errors.nome }}
              </p>
            </div>

            <div>
              <label
                for="sobrenome"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sobrenome
              </label>
              <input
                id="sobrenome"
                v-model="form.sobrenome"
                type="text"
                required
                class="input-field mt-1"
                :class="{ 'border-red-500': errors.sobrenome }"
                placeholder="Seu sobrenome"
              />
              <p v-if="errors.sobrenome" class="mt-1 text-sm text-red-600">
                {{ errors.sobrenome }}
              </p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.email }"
              placeholder="seu@email.com"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Telefone -->
          <div>
            <label
              for="telefone"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Telefone
            </label>
            <input
              id="telefone"
              v-model="form.telefone"
              type="tel"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.telefone }"
              placeholder="(11) 99999-9999"
            />
            <p v-if="errors.telefone" class="mt-1 text-sm text-red-600">
              {{ errors.telefone }}
            </p>
          </div>

          <!-- Senha -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Senha
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Mínimo 8 caracteres"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirmar Senha -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="input-field mt-1"
              :class="{ 'border-red-500': errors.confirmPassword }"
              placeholder="Confirme sua senha"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Termos -->
          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.aceitarTermos"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label
              for="terms"
              class="ml-2 block text-sm text-gray-900 dark:text-gray-300"
            >
              Eu aceito os
              <NuxtLink
                to="/termos"
                class="text-primary-600 hover:text-primary-500"
              >
                termos de uso
              </NuxtLink>
              e a
              <NuxtLink
                to="/privacidade"
                class="text-primary-600 hover:text-primary-500"
              >
                política de privacidade
              </NuxtLink>
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            <Icon
              v-if="loading"
              name="heroicons:arrow-path"
              class="animate-spin -ml-1 mr-3 h-5 w-5"
            />
            {{ loading ? 'Criando conta...' : 'Criar Conta' }}
          </button>
        </div>

        <div
          v-if="error"
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4"
        >
          <div class="flex">
            <Icon
              name="heroicons:exclamation-triangle"
              class="w-5 h-5 text-red-400"
            />
            <div class="ml-3">
              <p class="text-sm text-red-800 dark:text-red-200">
                {{ error }}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const { register, validateEmail, validatePhone } = useAuth();

const form = ref({
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  password: '',
  confirmPassword: '',
  aceitarTermos: false,
});

const errors = ref({});
const loading = ref(false);
const error = ref('');

const validateForm = () => {
  errors.value = {};

  if (!form.value.nome) {
    errors.value.nome = 'Nome é obrigatório';
  }

  if (!form.value.sobrenome) {
    errors.value.sobrenome = 'Sobrenome é obrigatório';
  }

  if (!form.value.email) {
    errors.value.email = 'Email é obrigatório';
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = 'Email inválido';
  }

  if (!form.value.telefone) {
    errors.value.telefone = 'Telefone é obrigatório';
  } else if (!validatePhone(form.value.telefone)) {
    errors.value.telefone = 'Telefone inválido';
  }

  if (!form.value.password) {
    errors.value.password = 'Senha é obrigatória';
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Senha deve ter pelo menos 8 caracteres';
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirme sua senha';
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Senhas não coincidem';
  }

  if (!form.value.aceitarTermos) {
    errors.value.aceitarTermos = 'Você deve aceitar os termos';
  }

  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  if (!validateForm()) return;

  loading.value = true;
  error.value = '';

  try {
    const result = await register({
      nome: form.value.nome,
      sobrenome: form.value.sobrenome,
      email: form.value.email,
      telefone: form.value.telefone,
      password: form.value.password,
    });

    if (result.success) {
      // Redirecionar para a página anterior ou home
      const redirectTo = useRoute().query.redirect || '/';
      await navigateTo(redirectTo);
    } else {
      error.value = result.error || 'Erro ao criar conta';
    }
  } catch (err) {
    error.value = 'Erro inesperado. Tente novamente.';
  } finally {
    loading.value = false;
  }
};

// Definir meta para a página
useHead({
  title: 'Cadastro - Henrique Store',
});
</script>
