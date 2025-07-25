export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, description, price, images, stock } = body;

    // Validação básica
    if (!name || !description || !price || !stock) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Campos obrigatórios: name, description, price, stock',
      });
    }

    const fs = await import('fs/promises');
    const path = await import('path');

    const manualPath = path.join(process.cwd(), 'data', 'manual-products.json');

    // Carregar produtos manuais existentes
    let manualProducts = [];
    try {
      const existingData = await fs.readFile(manualPath, 'utf-8');
      manualProducts = JSON.parse(existingData);
    } catch (error) {
      // Arquivo não existe, criar diretório
      await fs.mkdir(path.dirname(manualPath), { recursive: true });
    }

    // Criar novo produto manual
    const newProduct = {
      id: `manual_${Date.now()}`,
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      images: images ? images.split(',').map((img) => img.trim()) : [],
      category: 'Manual',
      createdAt: new Date().toISOString(),
      source: 'manual',
      isManual: true,
    };

    // Adicionar à lista
    manualProducts.push(newProduct);

    // Salvar arquivo
    await fs.writeFile(manualPath, JSON.stringify(manualProducts, null, 2));

    return {
      success: true,
      message: 'Produto cadastrado com sucesso',
      product: newProduct,
    };
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    return {
      success: false,
      message: 'Erro ao cadastrar produto',
      error: error.message,
    };
  }
});
