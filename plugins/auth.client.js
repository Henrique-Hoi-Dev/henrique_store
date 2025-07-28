export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();
  const { verifyToken } = useAuth();

  // Carregar dados do localStorage
  userStore.loadFromLocalStorage();

  // Verificar token automaticamente se existir
  if (userStore.token) {
    try {
      const isValid = await verifyToken();
      if (!isValid) {
        // Token inválido, fazer logout
        userStore.logout();
      }
    } catch (error) {
      console.error('Erro na verificação automática do token:', error);
      userStore.logout();
    }
  }
}); 