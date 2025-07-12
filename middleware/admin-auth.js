export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login');
  }
});
