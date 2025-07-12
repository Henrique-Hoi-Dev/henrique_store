export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Se a rota começa com /admin, verificar se é admin
  if (to.path.startsWith('/admin')) {
    if (!isAuthenticated.value) {
      // Redirecionar para login se não estiver autenticado
      return navigateTo('/login');
    }

    if (!isAdmin.value) {
      // Redirecionar para home se não for admin
      return navigateTo('/');
    }
  }

  // Se a rota é /checkout, verificar se está autenticado
  if (to.path === '/checkout') {
    if (!isAuthenticated.value) {
      // Redirecionar para login
      return navigateTo('/login');
    }
  }

  // Se a rota é /perfil, verificar se está autenticado
  if (to.path === '/perfil') {
    if (!isAuthenticated.value) {
      // Redirecionar para login
      return navigateTo('/login');
    }
  }
});
