<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
  >
    <!-- Product Image -->
    <div class="relative">
      <img
        :src="product.image || '/images/placeholder.jpg'"
        :alt="product.name"
        class="w-full h-48 object-cover"
      />

      <!-- Discount Badge -->
      <div v-if="hasDiscount" class="absolute top-2 left-2">
        <span
          class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
        >
          {{ discountPercentage }}% OFF
        </span>
      </div>

      <!-- Favorite Button -->
      <button
        @click="toggleFavorite"
        class="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
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
          class="w-5 h-5 text-gray-400 hover:text-red-500"
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
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-2">
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
        <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">
          {{ product.rating }} ({{ product.soldCount }}
          {{ $t('products.sold') }})
        </span>
      </div>

      <!-- Price -->
      <div class="flex items-center mb-4">
        <span class="text-xl font-bold text-gray-900 dark:text-white">
          R$ {{ formatPrice(product.price) }}
        </span>
        <span
          v-if="hasDiscount"
          class="text-sm text-gray-500 line-through ml-2"
        >
          R$ {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex space-x-2">
        <button
          @click="addToCart"
          class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          {{ $t('products.addToCart') }}
        </button>
        <button
          @click="buyNow"
          class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          {{ $t('products.buyNow') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { addToCart: addToCartStore } = useCart();

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

const formatPrice = (price) => {
  return price.toFixed(2).replace('.', ',');
};

const toggleFavorite = () => {
  // Emit event to parent or update store
  props.product.isFavorite = !props.product.isFavorite;
};

const addToCart = () => {
  addToCartStore({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
    quantity: 1,
  });
};

const buyNow = () => {
  addToCart();
  navigateTo('/checkout');
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
