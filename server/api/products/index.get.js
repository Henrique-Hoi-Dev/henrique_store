export default defineEventHandler(async (event) => {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');

    const syncedPath = path.join(process.cwd(), 'data', 'synced-products.json');
    const manualPath = path.join(process.cwd(), 'data', 'manual-products.json');

    let syncedProducts = [];
    let manualProducts = [];

    // Carregar produtos sincronizados
    try {
      const syncedData = await fs.readFile(syncedPath, 'utf-8');
      syncedProducts = JSON.parse(syncedData);
    } catch (error) {
      console.log('Nenhum produto sincronizado encontrado');
    }

    // Carregar produtos manuais
    try {
      const manualData = await fs.readFile(manualPath, 'utf-8');
      manualProducts = JSON.parse(manualData);
    } catch (error) {
      console.log('Nenhum produto manual encontrado');
    }

    // Combinar produtos com informações de origem
    const allProducts = [
      ...syncedProducts.map((p) => ({
        ...p,
        source: 'supplier',
        isManual: false,
      })),
      ...manualProducts.map((p) => ({
        ...p,
        source: 'manual',
        isManual: true,
      })),
    ];

    return {
      success: true,
      products: allProducts,
      stats: {
        total: allProducts.length,
        synced: syncedProducts.length,
        manual: manualProducts.length,
      },
    };
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return {
      success: false,
      message: 'Erro ao carregar produtos',
      error: error.message,
    };
  }
});
