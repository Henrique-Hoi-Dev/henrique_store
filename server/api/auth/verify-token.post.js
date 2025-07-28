import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { token } = body;

    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Token é obrigatório'
      });
    }

    // Obter configuração do runtime
    const config = useRuntimeConfig();
    const AUTH_MS_URL = config.authMsUrl;

    // Chamar o microserviço de autenticação
    const response = await axios.get(`${AUTH_MS_URL}/auth/verify-token`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    
    if (error.response) {
      throw createError({
        statusCode: error.response.status,
        statusMessage: error.response.data?.message || 'Erro na verificação do token'
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    });
  }
});
