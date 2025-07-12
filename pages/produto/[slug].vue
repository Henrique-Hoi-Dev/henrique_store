<template>
  <div v-if="product" class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol
          class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
        >
          <li>
            <NuxtLink to="/" class="hover:text-primary-600 transition-colors">
              {{ $t('common.home') }}
            </NuxtLink>
          </li>
          <li>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </li>
          <li>
            <NuxtLink
              :to="`/categoria/${product.category}`"
              class="hover:text-primary-600 transition-colors"
            >
              {{ getCategoryName(product.category) }}
            </NuxtLink>
          </li>
          <li>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </li>
          <li class="text-gray-900 dark:text-white font-medium">
            {{ product.name }}
          </li>
        </ol>
      </nav>

      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <!-- Product Images -->
          <div class="space-y-4">
            <!-- Main Image -->
            <div class="relative overflow-hidden rounded-lg">
              <img
                :src="selectedImage"
                :alt="product.name"
                class="w-full h-96 object-cover"
              />

              <!-- Discount Badge -->
              <div v-if="hasDiscount" class="absolute top-4 left-4">
                <span
                  class="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg"
                >
                  -{{ discountPercentage }}%
                </span>
              </div>

              <!-- Favorite Button -->
              <button
                @click="toggleFavorite"
                class="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg
                  v-if="product.isFavorite"
                  class="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors"
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

            <!-- Thumbnail Gallery -->
            <div
              v-if="product.gallery && product.gallery.length > 0"
              class="flex space-x-2"
            >
              <button
                v-for="(image, index) in [product.image, ...product.gallery]"
                :key="index"
                @click="selectedImage = image"
                class="w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300"
                :class="
                  selectedImage === image
                    ? 'border-primary-600'
                    : 'border-gray-200 dark:border-gray-600'
                "
              >
                <img
                  :src="image"
                  :alt="`${product.name} - Imagem ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="space-y-6">
            <!-- Category -->
            <div>
              <span
                class="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide"
              >
                {{ getCategoryName(product.category) }}
              </span>
            </div>

            <!-- Product Name -->
            <h1
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              {{ product.name }}
            </h1>

            <!-- Rating and Reviews -->
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <div class="flex items-center">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="w-5 h-5"
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
                <span
                  class="text-lg font-semibold text-gray-900 dark:text-white ml-2"
                >
                  {{ product.rating }}
                </span>
              </div>
              <span class="text-gray-600 dark:text-gray-400">
                ({{ product.reviews }} {{ $t('products.reviews') }})
              </span>
              <span class="text-gray-600 dark:text-gray-400">
                • {{ product.soldCount }} {{ $t('products.sold') }}
              </span>
            </div>

            <!-- Price -->
            <div class="space-y-2">
              <div class="flex items-center space-x-4">
                <span class="text-4xl font-bold text-gray-900 dark:text-white">
                  {{ formatPrice(product.price) }}
                </span>
                <span
                  v-if="hasDiscount"
                  class="text-2xl text-gray-500 line-through"
                >
                  {{ formatPrice(product.originalPrice) }}
                </span>
              </div>
              <p v-if="hasDiscount" class="text-green-600 font-semibold">
                {{ $t('products.save') }}
                {{ formatPrice(product.originalPrice - product.price) }}
              </p>
            </div>

            <!-- Stock Status -->
            <div class="flex items-center space-x-2">
              <div
                class="w-3 h-3 rounded-full"
                :class="product.inStock ? 'bg-green-500' : 'bg-red-500'"
              ></div>
              <span
                class="font-semibold"
                :class="product.inStock ? 'text-green-600' : 'text-red-600'"
              >
                {{
                  product.inStock
                    ? $t('products.inStock')
                    : $t('products.outOfStock')
                }}
              </span>
            </div>

            <!-- Description -->
            <div>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
              >
                {{ $t('products.description') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Specifications -->
            <div v-if="product.specs">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-3"
              >
                {{ $t('products.specifications') }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  v-for="(value, key) in product.specs"
                  :key="key"
                  class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{
                    formatSpecKey(key)
                  }}</span>
                  <span class="text-gray-900 dark:text-white">{{ value }}</span>
                </div>
              </div>
            </div>

            <!-- Add to Cart -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <div
                  class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  <button
                    @click="decreaseQuantity"
                    class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    :disabled="quantity <= 1"
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span class="px-4 py-2 text-lg font-semibold">{{
                    quantity
                  }}</span>
                  <button
                    @click="increaseQuantity"
                    class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                @click="addToCart"
                :disabled="!product.inStock"
                class="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span v-if="!product.inStock">{{
                  $t('products.outOfStock')
                }}</span>
                <span v-else>{{ $t('products.addToCart') }}</span>
              </button>

              <button
                @click="buyNow"
                :disabled="!product.inStock"
                class="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {{ $t('products.buyNow') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="loading"
    class="min-h-screen flex items-center justify-center"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
    ></div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('products.notFound') }}
      </h2>
      <NuxtLink
        to="/"
        class="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        {{ $t('common.backToHome') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { $t } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const { fetchProducts, getProductBySlug, formatPrice } = useProducts();
const { addToCart: addToCartStore } = useCart();

const product = ref(null);
const loading = ref(true);
const quantity = ref(1);
const selectedImage = ref('');

const hasDiscount = computed(() => {
  return (
    product.value?.originalPrice &&
    product.value.originalPrice > product.value.price
  );
});

const discountPercentage = computed(() => {
  if (!hasDiscount.value) return 0;
  const discount =
    ((product.value.originalPrice - product.value.price) /
      product.value.originalPrice) *
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

const formatSpecKey = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

const toggleFavorite = () => {
  if (product.value) {
    product.value.isFavorite = !product.value.isFavorite;
  }
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (!product.value?.inStock) return;

  addToCartStore({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    quantity: quantity.value,
  });
};

const buyNow = () => {
  if (!product.value?.inStock) return;

  addToCartStore({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    quantity: quantity.value,
  });

  router.push('/checkout');
};

// Fetch product data
onMounted(async () => {
  await fetchProducts();
  const slug = route.params.slug;
  product.value = getProductBySlug(slug);

  if (product.value) {
    selectedImage.value = product.value.image;
  }

  loading.value = false;
});

// Set page title
useHead(() => ({
  title: product.value
    ? `${product.value.name} - Henrique Store`
    : 'Produto não encontrado',
}));
</script>
