import mercadopago from 'mercadopago';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
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
      success: 'http://localhost:3000/pedido-sucesso',
      failure: 'http://localhost:3000/checkout?erro=1',
      pending: 'http://localhost:3000/checkout?pendente=1',
    },
    notification_url: process.env.MERCADO_PAGO_WEBHOOK_URL,
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return { init_point: response.body.init_point };
  } catch (error) {
    return { error: error.message };
  }
});
