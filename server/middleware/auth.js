import axios from 'axios';

export default defineEventHandler(async (event) => {
  // Apenas para rotas que começam com /api/protected
  if (!event.path.startsWith('/api/protected')) {
    return;
  }

  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token de autorização é obrigatório'
      });
    }

    // Obter configuração do runtime
    const config = useRuntimeConfig();
    const AUTH_MS_URL = config.authMsUrl;

    // Verificar token no microserviço de autenticação
    const response = await axios.get(`${AUTH_MS_URL}/auth/verify-token`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Adicionar dados do usuário ao contexto da requisição
    event.context.user = response.data.data;
    
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    
    if (error.response) {
      throw createError({
        statusCode: error.response.status,
        statusMessage: error.response.data?.message || 'Token inválido'
      });
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Token inválido'
    });
  }
}); 