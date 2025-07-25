import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    loading: false,
  }),

  getters: {
    userFullName: (state) => {
      if (!state.user) return '';
      return `${state.user.firstName || state.user.nome} ${state.user.lastName || state.user.sobrenome}`;
    },

    isAdmin: (state) => {
      return state.user?.role === 'admin';
    },

    userInitials: (state) => {
      if (!state.user) return 'U';
      const firstName = state.user.firstName || state.user.nome || '';
      const lastName = state.user.lastName || state.user.sobrenome || '';
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
    },
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock de resposta da API
        const response = {
          user: {
            id: 1,
            firstName: 'João',
            lastName: 'Silva',
            nome: 'João',
            sobrenome: 'Silva',
            email: credentials.email,
            role: 'user',
            telefone: '(11) 99999-9999',
            endereco: {
              cep: '01234-567',
              rua: 'Rua das Flores',
              numero: '123',
              complemento: 'Apto 45',
              bairro: 'Centro',
              cidade: 'São Paulo',
              estado: 'SP',
            },
          },
          token: 'mock-jwt-token-12345',
        };

        this.user = response.user;
        this.token = response.token;
        this.isAuthenticated = true;

        // Salvar no localStorage
        this.saveToLocalStorage();

        return { success: true };
      } catch (error) {
        console.error('Erro no login:', error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock de resposta da API
        const response = {
          user: {
            id: 2,
            firstName: userData.firstName || userData.nome,
            lastName: userData.lastName || userData.sobrenome,
            nome: userData.nome,
            sobrenome: userData.sobrenome,
            email: userData.email,
            role: 'user',
            telefone: userData.telefone,
            endereco: userData.endereco,
          },
          token: 'mock-jwt-token-new-user',
        };

        this.user = response.user;
        this.token = response.token;
        this.isAuthenticated = true;

        // Salvar no localStorage
        this.saveToLocalStorage();

        return { success: true };
      } catch (error) {
        console.error('Erro no registro:', error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // Limpar localStorage
      this.clearLocalStorage();
    },

    async updateProfile(profileData) {
      this.loading = true;
      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Atualizar dados do usuário
        this.user = { ...this.user, ...profileData };

        // Salvar no localStorage
        this.saveToLocalStorage();

        return { success: true };
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    async changePassword(passwordData) {
      this.loading = true;
      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { success: true };
      } catch (error) {
        console.error('Erro ao alterar senha:', error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: this.user,
            token: this.token,
            isAuthenticated: this.isAuthenticated,
          })
        );
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('user');
        if (saved) {
          const data = JSON.parse(saved);
          this.user = data.user;
          this.token = data.token;
          this.isAuthenticated = data.isAuthenticated;
        }
      }
    },

    clearLocalStorage() {
      if (process.client) {
        localStorage.removeItem('user');
      }
    },
  },
});
