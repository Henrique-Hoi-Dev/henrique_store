<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-r from-primary-600 to-primary-700 text-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            {{ $t('home.hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {{ $t('home.hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/produtos"
              class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {{ $t('home.hero.viewProducts') }}
            </NuxtLink>
            <NuxtLink
              to="/ofertas"
              class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              {{ $t('home.hero.specialOffers') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          {{ $t('home.categories.title') }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            class="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {{ $t('home.categories.electronics') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              100+ {{ $t('home.categories.products') }}
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
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
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {{ $t('home.categories.clothing') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              200+ {{ $t('home.categories.products') }}
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {{ $t('home.categories.home') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              150+ {{ $t('home.categories.products') }}
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {{ $t('home.categories.sports') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              80+ {{ $t('home.categories.products') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ $t('home.featured.title') }}
          </h2>
          <NuxtLink
            to="/produtos"
            class="text-primary-600 hover:text-primary-700 font-semibold"
          >
            {{ $t('home.featured.viewAll') }}
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardProduto
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Special Offers -->
    <section class="py-16 bg-primary-50 dark:bg-primary-900/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t('home.offers.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            {{ $t('home.offers.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ $t('home.benefits.freeShipping.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t('home.benefits.freeShipping.description') }}
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
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
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ $t('home.benefits.securePurchase.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t('home.benefits.securePurchase.description') }}
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div
              class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ $t('home.benefits.fastDelivery.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t('home.benefits.fastDelivery.description') }}
            </p>
          </div>
        </div>

        <div class="text-center mt-8">
          <NuxtLink
            to="/produtos"
            class="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            {{ $t('home.offers.takeAdvantage') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Mock data for featured products
const featuredProducts = ref([
  {
    id: 1,
    name: 'Smartphone Galaxy S23',
    price: 2999.99,
    originalPrice: 3499.99,
    image: '/images/product1.jpg',
    rating: 4.8,
    soldCount: 1250,
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Fone de Ouvido Wireless',
    price: 299.99,
    originalPrice: 399.99,
    image: '/images/product2.jpg',
    rating: 4.6,
    soldCount: 890,
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Smart Watch Series 8',
    price: 1299.99,
    originalPrice: 1599.99,
    image: '/images/product3.jpg',
    rating: 4.9,
    soldCount: 567,
    isFavorite: false,
  },
  {
    id: 4,
    name: 'Câmera DSLR Canon',
    price: 2499.99,
    originalPrice: 2999.99,
    image: '/images/product4.jpg',
    rating: 4.7,
    soldCount: 234,
    isFavorite: false,
  },
]);

// Set page title
useHead({
  title: 'Henrique Store - Sua Loja Online de Confiança',
});
</script>
