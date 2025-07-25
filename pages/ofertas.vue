<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <section
      class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Ofertas Especiais</h1>
          <p class="text-xl opacity-90 max-w-2xl mx-auto">
            Aproveite nossos melhores preços e descontos exclusivos
          </p>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
      />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Products Grid -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Filters -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex items-center space-x-4">
            <span class="text-gray-600"
              >{{ filteredProducts.length }} produtos em oferta</span
            >
          </div>

          <div class="flex items-center space-x-4">
            <select
              v-model="sortBy"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="discount">Maior Desconto</option>
              <option value="price">Menor Preço</option>
              <option value="name">Nome A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in sortedProducts"
          :key="product.id"
          :product="product"
          class="animate-fade-in-up"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div
          class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
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
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">
          Nenhuma oferta disponível
        </h3>
        <p class="text-gray-600 mb-6">
          No momento não temos ofertas especiais. Volte mais tarde!
        </p>
        <NuxtLink
          to="/produtos"
          class="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300"
        >
          Ver Todos os Produtos
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { fetchProducts, loading, error } = useProducts();

// Reactive data
const sortBy = ref('discount');

// Computed properties
const filteredProducts = computed(() => {
  const products = useProducts().products.value;
  return products.filter((product) => product.discount && product.discount > 0);
});

const sortedProducts = computed(() => {
  const products = [...filteredProducts.value];

  switch (sortBy.value) {
    case 'discount':
      return products.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    case 'price':
      return products.sort((a, b) => a.price - b.price);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
});

// Fetch products on page load
onMounted(() => {
  fetchProducts();
});

// Set page title
useHead({
  title: 'Ofertas Especiais - Henrique Store',
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
