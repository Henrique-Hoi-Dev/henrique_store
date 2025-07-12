import { defineStore } from 'pinia';

export const useAdminAuth = defineStore('adminAuth', {
  state: () => ({
    isAuthenticated: false,
    admin: null,
    loading: false,
    error: '',
  }),
  actions: {
    async login({ email, password }) {
      this.loading = true;
      this.error = '';
      // Mock simples: email: admin@admin.com, senha: admin123
      if (email === 'admin@admin.com' && password === 'admin123') {
        this.isAuthenticated = true;
        this.admin = { email };
        this.loading = false;
        return { success: true };
      } else {
        this.error = 'E-mail ou senha inválidos';
        this.loading = false;
        return { success: false, error: this.error };
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.admin = null;
    },
  },
});
