<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {{ t('cart.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ t('cart.subtitle') }}
        </p>
      </div>

      <div v-if="cartItems.length === 0" class="text-center py-16">
        <div
          class="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('cart.empty.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {{ t('cart.empty.description') }}
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {{ t('cart.empty.startShopping') }}
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div class="p-6">
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-white mb-6"
              >
                {{ t('cart.items') }} ({{ totalItems }})
              </h2>

              <div class="space-y-6">
                <div
                  v-for="item in cartItems"
                  :key="item.id"
                  class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <!-- Product Image -->
                  <div class="flex-shrink-0">
                    <img
                      :src="item.image || '/images/placeholder.jpg'"
                      :alt="item.name"
                      class="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  <!-- Product Info -->
                  <div class="flex-1 min-w-0">
                    <h3
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                    >
                      {{ item.name }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                      {{ formatPrice(item.price) }}
                    </p>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="flex items-center space-x-2">
                    <button
                      @click="decreaseQuantity(item.id)"
                      class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      :disabled="item.quantity <= 1"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>

                    <span
                      class="w-12 text-center font-semibold text-gray-900 dark:text-white"
                    >
                      {{ item.quantity }}
                    </span>

                    <button
                      @click="increaseQuantity(item.id)"
                      class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Price -->
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-900 dark:text-white">
                      {{ formatPrice(item.price * item.quantity) }}
                    </p>
                  </div>

                  <!-- Remove Button -->
                  <button
                    @click="removeFromCart(item.id)"
                    class="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8"
          >
            <h2
              class="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              {{ t('cart.summary.title') }}
            </h2>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ t('cart.summary.subtotal') }}
                </span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ formatPrice(subtotal) }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ t('cart.summary.shipping') }}
                </span>
                <span class="font-semibold text-green-600">
                  {{ t('cart.summary.free') }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ t('cart.summary.tax') }}
                </span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ formatPrice(tax) }}
                </span>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div class="flex justify-between">
                  <span class="text-lg font-bold text-gray-900 dark:text-white">
                    {{ t('cart.summary.total') }}
                  </span>
                  <span class="text-2xl font-bold text-primary-600">
                    {{ formatPrice(total) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button
                @click="proceedToCheckout"
                class="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {{ t('cart.summary.checkout') }}
              </button>

              <NuxtLink
                to="/"
                class="block w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-4 px-6 rounded-lg font-semibold text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              >
                {{ t('cart.summary.continueShopping') }}
              </NuxtLink>
            </div>

            <!-- Security Badge -->
            <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span
                  class="text-sm text-green-700 dark:text-green-400 font-medium"
                >
                  {{ t('cart.summary.secureCheckout') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const { cartItems, removeFromCart, updateQuantity, formatPrice } = useCart();

const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const tax = computed(() => {
  return subtotal.value * 0.1; // 10% tax
});

const total = computed(() => {
  return subtotal.value + tax.value;
});

const increaseQuantity = (itemId) => {
  const item = cartItems.value.find((item) => item.id === itemId);
  if (item) {
    updateQuantity(itemId, item.quantity + 1);
  }
};

const decreaseQuantity = (itemId) => {
  const item = cartItems.value.find((item) => item.id === itemId);
  if (item && item.quantity > 1) {
    updateQuantity(itemId, item.quantity - 1);
  }
};

const proceedToCheckout = () => {
  router.push('/checkout');
};

// Set page title
useHead({
  title: 'Carrinho - Henrique Store',
});
</script>
