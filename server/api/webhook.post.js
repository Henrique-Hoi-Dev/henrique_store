export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Aqui você pode salvar o status do pagamento no seu banco de dados
  // Exemplo: status = body.data.status, id = body.data.id

  // TODO: Atualizar o status do pedido no sistema

  return { received: true };
});
