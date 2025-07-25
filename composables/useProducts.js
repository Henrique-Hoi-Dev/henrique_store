export const useProducts = () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const stats = ref({
    total: 0,
    synced: 0,
    manual: 0,
  });

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch('/api/products');

      if (response.success) {
        products.value = response.products;
        stats.value = response.stats;
      } else {
        error.value = response.message;
      }
    } catch (err) {
      error.value = 'Erro ao carregar produtos';
      console.error('Erro ao carregar produtos:', err);
    } finally {
      loading.value = false;
    }
  };

  const syncProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch('/api/supplier/sync', {
        method: 'POST',
      });

      if (response.success) {
        // Recarregar produtos após sincronização
        await fetchProducts();
        return response;
      } else {
        error.value = response.message;
        return response;
      }
    } catch (err) {
      error.value = 'Erro na sincronização';
      console.error('Erro na sincronização:', err);
      return { success: false, message: 'Erro na sincronização' };
    } finally {
      loading.value = false;
    }
  };

  const addManualProduct = async (productData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch('/api/products/manual', {
        method: 'POST',
        body: productData,
      });

      if (response.success) {
        // Recarregar produtos após adição
        await fetchProducts();
        return response;
      } else {
        error.value = response.message;
        return response;
      }
    } catch (err) {
      error.value = 'Erro ao cadastrar produto';
      console.error('Erro ao cadastrar produto:', err);
      return { success: false, message: 'Erro ao cadastrar produto' };
    } finally {
      loading.value = false;
    }
  };

  const getProductById = (id) => {
    return products.value.find((p) => p.id === id);
  };

  const getProductsBySource = (source) => {
    return products.value.filter((p) => p.source === source);
  };

  const getFeaturedProducts = () => {
    return products.value.filter((p) => p.isFeatured).slice(0, 8);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return {
    products: readonly(products),
    loading: readonly(loading),
    error: readonly(error),
    stats: readonly(stats),
    fetchProducts,
    syncProducts,
    addManualProduct,
    getProductById,
    getProductsBySource,
    getFeaturedProducts,
    formatPrice,
  };
};
