import mercadopago from 'mercadopago';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  mercadopago.configure({
    access_token: config.mercadopagoAccessToken,
  });

  const items = body.items.map((item) => ({
    title: item.name,
    quantity: item.quantity,
    currency_id: 'BRL',
    unit_price: Number(item.price),
  }));

  const preference = {
    items,
    payer: {
      name: body.cliente.nome,
      email: body.cliente.email,
      identification: {
        type: 'CPF',
        number: body.cliente.cpf,
      },
    },
    back_urls: {
      success: `${config.public.apiBase}/pedido-sucesso`,
      failure: `${config.public.apiBase}/checkout?erro=1`,
      pending: `${config.public.apiBase}/checkout?pendente=1`,
    },
    notification_url: config.mercadopagoWebhookUrl,
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return { init_point: response.body.init_point };
  } catch (error) {
    console.error('Erro ao criar preferência do Mercado Pago:', error);
    return { error: error.message };
  }
});
