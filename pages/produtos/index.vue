<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {{ $t('products.title') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ $t('products.subtitle') }}
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:w-1/4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t('products.filters.title') }}
          </h3>

          <!-- Categories -->
          <div class="mb-6">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">
              {{ $t('products.filters.categories') }}
            </h4>
            <div class="space-y-2">
              <label
                v-for="category in categories"
                :key="category.id"
                class="flex items-center"
              >
                <input
                  v-model="selectedCategories"
                  :value="category.id"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {{ category.name }}
                </span>
              </label>
            </div>
          </div>

          <!-- Price Range -->
          <div class="mb-6">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">
              {{ $t('products.filters.price') }}
            </h4>
            <div class="space-y-2">
              <label
                v-for="range in priceRanges"
                :key="range.id"
                class="flex items-center"
              >
                <input
                  v-model="selectedPriceRange"
                  :value="range.id"
                  type="radio"
                  name="price-range"
                  class="rounded-full border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {{ range.label }}
                </span>
              </label>
            </div>
          </div>

          <!-- Rating -->
          <div class="mb-6">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">
              {{ $t('products.filters.rating') }}
            </h4>
            <div class="space-y-2">
              <label
                v-for="rating in [5, 4, 3, 2, 1]"
                :key="rating"
                class="flex items-center"
              >
                <input
                  v-model="selectedRating"
                  :value="rating"
                  type="radio"
                  name="rating"
                  class="rounded-full border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div class="flex items-center ml-2">
                  <div class="flex">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      class="w-4 h-4"
                      :class="
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      "
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </svg>
                  </div>
                  <span class="text-sm text-gray-700 dark:text-gray-300 ml-1">
                    {{ rating }}+ {{ $t('products.stars') }}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <!-- Clear Filters -->
          <button
            @click="clearFilters"
            class="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            {{ $t('products.filters.clearFilters') }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="lg:w-3/4">
        <!-- Sort and Results -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
        >
          <p class="text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            {{ filteredProducts.length }} {{ $t('products.results') }}
          </p>

          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('products.sort.label') }}
            </label>
            <select
              v-model="sortBy"
              class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="relevance">
                {{ $t('products.sort.relevance') }}
              </option>
              <option value="price-low">
                {{ $t('products.sort.priceLow') }}
              </option>
              <option value="price-high">
                {{ $t('products.sort.priceHigh') }}
              </option>
              <option value="rating">{{ $t('products.sort.rating') }}</option>
              <option value="sold">{{ $t('products.sort.sold') }}</option>
            </select>
          </div>
        </div>

        <!-- Products -->
        <div
          v-if="filteredProducts.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <CardProduto
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- No Results -->
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {{ $t('products.noResults.title') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ $t('products.noResults.description') }}
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8">
          <nav class="flex items-center space-x-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ $t('common.previous') }}
            </button>

            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg',
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
              ]"
            >
              {{ page }}
            </button>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ $t('common.next') }}
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mock data
const products = ref([
  {
    id: 1,
    name: 'Smartphone Galaxy S23',
    price: 2999.99,
    originalPrice: 3499.99,
    image: '/images/product1.jpg',
    rating: 4.8,
    soldCount: 1250,
    category: 'electronics',
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
    category: 'electronics',
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
    category: 'electronics',
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
    category: 'electronics',
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Tênis Nike Air Max',
    price: 399.99,
    originalPrice: 499.99,
    image: '/images/product5.jpg',
    rating: 4.5,
    soldCount: 1200,
    category: 'sports',
    isFavorite: false,
  },
  {
    id: 6,
    name: 'Camiseta Básica',
    price: 49.99,
    originalPrice: 79.99,
    image: '/images/product6.jpg',
    rating: 4.3,
    soldCount: 2500,
    category: 'clothing',
    isFavorite: false,
  },
]);

const categories = ref([
  { id: 'electronics', name: 'Eletrônicos' },
  { id: 'clothing', name: 'Roupas' },
  { id: 'home', name: 'Casa' },
  { id: 'sports', name: 'Esportes' },
]);

const priceRanges = ref([
  { id: 'all', label: 'Todos os preços' },
  { id: 'upTo50', label: 'Até R$ 50' },
  { id: '50to100', label: 'R$ 50 - R$ 100' },
  { id: '100to200', label: 'R$ 100 - R$ 200' },
  { id: 'above200', label: 'Acima de R$ 200' },
]);

// Filters
const selectedCategories = ref([]);
const selectedPriceRange = ref('all');
const selectedRating = ref(null);
const sortBy = ref('relevance');
const currentPage = ref(1);
const itemsPerPage = 6;

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter((product) =>
      selectedCategories.value.includes(product.category)
    );
  }

  // Price range filter
  if (selectedPriceRange.value !== 'all') {
    filtered = filtered.filter((product) => {
      switch (selectedPriceRange.value) {
        case 'upTo50':
          return product.price <= 50;
        case '50to100':
          return product.price > 50 && product.price <= 100;
        case '100to200':
          return product.price > 100 && product.price <= 200;
        case 'above200':
          return product.price > 200;
        default:
          return true;
      }
    });
  }

  // Rating filter
  if (selectedRating.value) {
    filtered = filtered.filter(
      (product) => product.rating >= selectedRating.value
    );
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'sold':
        return b.soldCount - a.soldCount;
      default:
        return 0;
    }
  });

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Methods
const clearFilters = () => {
  selectedCategories.value = [];
  selectedPriceRange.value = 'all';
  selectedRating.value = null;
  currentPage.value = 1;
};

// Watch for filter changes to reset pagination
watch([selectedCategories, selectedPriceRange, selectedRating, sortBy], () => {
  currentPage.value = 1;
});

// Set page title
useHead({
  title: 'Produtos - Henrique Store',
});
</script>
