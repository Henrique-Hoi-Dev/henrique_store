<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Success Icon -->
        <div
          class="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <svg
            class="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <!-- Success Message -->
        <h1
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {{ $t('success.title') }}
        </h1>
        <p
          class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          {{ $t('success.subtitle') }}
        </p>

        <!-- Order Details -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {{ $t('success.orderDetails') }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="text-left">
              <div class="mb-4">
                <span
                  class="text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {{ $t('success.orderNumber') }}
                </span>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  #{{ orderNumber }}
                </p>
              </div>

              <div class="mb-4">
                <span
                  class="text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {{ $t('success.date') }}
                </span>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ orderDate }}
                </p>
              </div>
            </div>

            <div class="text-left">
              <div class="mb-4">
                <span
                  class="text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {{ $t('success.status') }}
                </span>
                <div class="flex items-center mt-1">
                  <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-lg font-semibold text-green-600">
                    {{ $t('success.processing') }}
                  </span>
                </div>
              </div>

              <div class="mb-4">
                <span
                  class="text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {{ $t('success.total') }}
                </span>
                <p class="text-2xl font-bold text-primary-600">
                  {{ formatPrice(orderTotal) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Info -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
          <div class="flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span
              class="text-lg font-semibold text-blue-900 dark:text-blue-100"
            >
              {{ $t('success.emailSent') }}
            </span>
          </div>
          <p class="text-blue-800 dark:text-blue-200 text-center">
            {{ $t('success.emailInfo') }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            {{ $t('success.continueShopping') }}
          </NuxtLink>

          <NuxtLink
            to="/pedidos"
            class="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {{ $t('success.viewOrders') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $t } = useNuxtApp();
const { formatPrice } = useCart();

// Generate random order number and date
const orderNumber = ref(Math.random().toString(36).substr(2, 9).toUpperCase());
const orderDate = ref(new Date().toLocaleDateString('pt-BR'));
const orderTotal = ref(0);

// Get order total from localStorage or set default
onMounted(() => {
  const savedTotal = localStorage.getItem('lastOrderTotal');
  if (savedTotal) {
    orderTotal.value = parseFloat(savedTotal);
  } else {
    orderTotal.value = 299.99; // Default value
  }
});

// Set page title
useHead({
  title: 'Pedido Confirmado - Henrique Store',
});
</script>
