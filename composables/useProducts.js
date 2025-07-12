export const useProducts = () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch('/data/products.json');
      products.value = response.products;
    } catch (err) {
      error.value = 'Erro ao carregar produtos';
      console.error('Error fetching products:', err);
    } finally {
      loading.value = false;
    }
  };

  const getProductBySlug = (slug) => {
    return products.value.find((product) => product.slug === slug);
  };

  const getFeaturedProducts = () => {
    return products.value.filter((product) => product.isFeatured);
  };

  const getProductsByCategory = (category) => {
    return products.value.filter((product) => product.category === category);
  };

  const searchProducts = (query) => {
    const searchTerm = query.toLowerCase();
    return products.value.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return {
    products: readonly(products),
    loading: readonly(loading),
    error: readonly(error),
    fetchProducts,
    getProductBySlug,
    getFeaturedProducts,
    getProductsByCategory,
    searchProducts,
    formatPrice,
    getDiscountPercentage,
  };
};
