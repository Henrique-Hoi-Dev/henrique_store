<template>
  <div
    class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
  >
    <!-- Product Image -->
    <div class="relative overflow-hidden">
      <img
        :src="product.image || '/images/placeholder.jpg'"
        :alt="product.name"
        class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
      />

      <!-- Discount Badge -->
      <div v-if="hasDiscount" class="absolute top-3 left-3">
        <span
          class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
        >
          -{{ discountPercentage }}%
        </span>
      </div>

      <!-- Favorite Button -->
      <button
        @click="toggleFavorite"
        class="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <svg
          v-if="product.isFavorite"
          class="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <!-- Quick View Overlay -->
      <div
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
      >
        <NuxtLink
          :to="`/produto/${product.slug}`"
          class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform scale-90 group-hover:scale-100 transition-transform duration-300"
        >
          {{ $t('products.viewDetails') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-6">
      <!-- Category -->
      <div class="mb-2">
        <span
          class="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide"
        >
          {{ getCategoryName(product.category) }}
        </span>
      </div>

      <!-- Product Name -->
      <h3
        class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors"
      >
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <svg
            v-for="star in 5"
            :key="star"
            class="w-4 h-4"
            :class="
              star <= Math.floor(product.rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            "
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>
        <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">
          {{ product.rating }} ({{ product.reviews }})
        </span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ formatPrice(product.price) }}
          </span>
          <span v-if="hasDiscount" class="text-lg text-gray-500 line-through">
            {{ formatPrice(product.originalPrice) }}
          </span>
        </div>

        <!-- Stock Status -->
        <div class="flex items-center">
          <div
            class="w-2 h-2 rounded-full"
            :class="product.inStock ? 'bg-green-500' : 'bg-red-500'"
          ></div>
          <span
            class="text-sm ml-1"
            :class="product.inStock ? 'text-green-600' : 'text-red-600'"
          >
            {{
              product.inStock
                ? $t('products.inStock')
                : $t('products.outOfStock')
            }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <button
          @click="addToCart"
          :disabled="!product.inStock"
          class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span v-if="!product.inStock">{{ $t('products.outOfStock') }}</span>
          <span v-else>{{ $t('products.addToCart') }}</span>
        </button>

        <NuxtLink
          :to="`/produto/${product.slug}`"
          class="block w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 text-center"
        >
          {{ $t('products.viewDetails') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $t } = useNuxtApp();
const { addToCart: addToCartStore } = useCart();
const { formatPrice } = useProducts();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const hasDiscount = computed(() => {
  return (
    props.product.originalPrice &&
    props.product.originalPrice > props.product.price
  );
});

const discountPercentage = computed(() => {
  if (!hasDiscount.value) return 0;
  const discount =
    ((props.product.originalPrice - props.product.price) /
      props.product.originalPrice) *
    100;
  return Math.round(discount);
});

const getCategoryName = (category) => {
  const categories = {
    electronics: 'Eletrônicos',
    clothing: 'Roupas',
    sports: 'Esportes',
    home: 'Casa',
  };
  return categories[category] || category;
};

const toggleFavorite = () => {
  props.product.isFavorite = !props.product.isFavorite;
};

const addToCart = () => {
  if (!props.product.inStock) return;

  addToCartStore({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
    quantity: 1,
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
