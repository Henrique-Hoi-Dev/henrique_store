export default defineEventHandler(async (event) => {
  // O middleware de autenticação já verificou o token
  // Os dados do usuário estão disponíveis em event.context.user

  const user = event.context.user;

  return {
    success: true,
    data: {
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
});
