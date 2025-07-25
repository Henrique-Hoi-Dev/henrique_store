export default defineEventHandler(async (event) => {
  const startTime = Date.now();

  try {
    // Verificação básica de saúde da aplicação
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
      },
      responseTime: Date.now() - startTime,
    };

    // Verificar se as variáveis de ambiente críticas estão definidas
    const requiredEnvVars = [
      'MERCADO_PAGO_ACCESS_TOKEN',
      'MERCADO_PAGO_WEBHOOK_URL',
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {
      healthStatus.status = 'warning';
      healthStatus.warnings = `Missing environment variables: ${missingEnvVars.join(
        ', '
      )}`;
    }

    setResponseStatus(event, healthStatus.status === 'healthy' ? 200 : 503);
    return healthStatus;
  } catch (error) {
    setResponseStatus(event, 503);
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      responseTime: Date.now() - startTime,
    };
  }
});
