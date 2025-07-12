<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      {{ $t('cart.title') }}
    </h1>

    <div v-if="cartItems.length > 0" class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Items -->
      <div class="lg:w-2/3">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ $t('cart.items') }}
            </h2>
          </div>

          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="p-6 flex items-center space-x-4"
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
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ item.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  R$ {{ formatPrice(item.price) }}
                </p>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center space-x-2">
                <button
                  @click="decreaseQuantity(item.id)"
                  class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                  class="w-12 text-center text-gray-900 dark:text-white font-medium"
                >
                  {{ item.quantity }}
                </span>

                <button
                  @click="increaseQuantity(item.id)"
                  class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>

              <!-- Price -->
              <div class="text-right">
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  R$ {{ formatPrice(item.price * item.quantity) }}
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

      <!-- Order Summary -->
      <div class="lg:w-1/3">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4"
        >
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t('cart.summary.title') }}
          </h2>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">
                {{ $t('cart.summary.subtotal') }}
              </span>
              <span class="text-gray-900 dark:text-white font-medium">
                R$ {{ formatPrice(subtotal) }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">
                {{ $t('cart.summary.shipping') }}
              </span>
              <span class="text-gray-900 dark:text-white font-medium">
                {{
                  shippingCost === 0
                    ? 'Grátis'
                    : `R$ ${formatPrice(shippingCost)}`
                }}
              </span>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div class="flex justify-between">
                <span
                  class="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {{ $t('cart.summary.total') }}
                </span>
                <span class="text-lg font-bold text-gray-900 dark:text-white">
                  R$ {{ formatPrice(total) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Free Shipping Info -->
          <div
            v-if="subtotal < 100"
            class="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
          >
            <p class="text-sm text-green-700 dark:text-green-400">
              {{ $t('cart.summary.freeShipping') }}
            </p>
          </div>

          <!-- Security Info -->
          <div class="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-blue-600 mr-2"
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
              <div>
                <p class="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {{ $t('cart.summary.securePurchase') }}
                </p>
                <p class="text-xs text-blue-700 dark:text-blue-300">
                  {{ $t('cart.summary.secureDescription') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <NuxtLink
              to="/checkout"
              class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center block"
            >
              {{ $t('cart.actions.checkout') }}
            </NuxtLink>

            <NuxtLink
              to="/produtos"
              class="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center block"
            >
              {{ $t('cart.actions.continueShopping') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center py-12">
      <svg
        class="w-16 h-16 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ $t('cart.empty.title') }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        {{ $t('cart.empty.description') }}
      </p>
      <NuxtLink
        to="/produtos"
        class="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        {{ $t('cart.empty.viewProducts') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { cartItems, removeFromCart, updateQuantity } = useCart();

const formatPrice = (price) => {
  return price.toFixed(2).replace('.', ',');
};

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const shippingCost = computed(() => {
  return subtotal.value >= 100 ? 0 : 15.99;
});

const total = computed(() => {
  return subtotal.value + shippingCost.value;
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

// Set page title
useHead({
  title: 'Carrinho - Henrique Store',
});
</script>
