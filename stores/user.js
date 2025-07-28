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
        // Obter configuração do runtime
        const config = useRuntimeConfig();
        const AUTH_MS_URL = config.authMsUrl;

<<<<<<< HEAD
        // Mock de resposta da API
        const response = {
          user: {
            id: 1,
            firstName: 'João',
            lastName: 'Silva',
            nome: 'João',
            sobrenome: 'Silva',
=======
        // Chamar o microserviço de autenticação
        const response = await $fetch(`${AUTH_MS_URL}/auth/login`, {
          method: 'POST',
          body: {
>>>>>>> b88b91c51cad58ac1cb420d3d99e5a1208112444
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (response.data) {
          const { userId, email, name, role, accessToken, refreshToken } =
            response.data;

          // Separar nome e sobrenome
          const nameParts = name.split(' ');
          const nome = nameParts[0] || '';
          const sobrenome = nameParts.slice(1).join(' ') || '';

          this.user = {
            id: userId,
            nome,
            sobrenome,
            email,
            role,
            telefone: '',
            endereco: {
              cep: '',
              rua: '',
              numero: '',
              complemento: '',
              bairro: '',
              cidade: '',
              estado: '',
            },
          };

          this.token = accessToken;
          this.isAuthenticated = true;

          // Salvar no localStorage
          this.saveToLocalStorage();

          return { success: true };
        }

        return { success: false, error: 'Resposta inválida do servidor' };
      } catch (error) {
        console.error('Erro no login:', error);
        return { success: false, error: error.message || 'Erro no login' };
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      try {
        // Obter configuração do runtime
        const config = useRuntimeConfig();
        const AUTH_MS_URL = config.authMsUrl;

<<<<<<< HEAD
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
=======
        // Preparar dados para o microserviço
        const registerData = {
          email: userData.email,
          password: userData.password,
          name: `${userData.nome} ${userData.sobrenome}`.trim(),
          role: 'BUYER',
>>>>>>> b88b91c51cad58ac1cb420d3d99e5a1208112444
        };

        // Chamar o microserviço de autenticação
        const response = await $fetch(`${AUTH_MS_URL}/auth/register`, {
          method: 'POST',
          body: registerData,
        });

        if (response.data) {
          const { userId, email, name, role, accessToken } = response.data;

          // Separar nome e sobrenome
          const nameParts = name.split(' ');
          const nome = nameParts[0] || '';
          const sobrenome = nameParts.slice(1).join(' ') || '';

          this.user = {
            id: userId,
            nome,
            sobrenome,
            email,
            role,
            telefone: userData.telefone || '',
            endereco: userData.endereco || {
              cep: '',
              rua: '',
              numero: '',
              complemento: '',
              bairro: '',
              cidade: '',
              estado: '',
            },
          };

          this.token = accessToken;
          this.isAuthenticated = true;

          // Salvar no localStorage
          this.saveToLocalStorage();

          return { success: true };
        }

        return { success: false, error: 'Resposta inválida do servidor' };
      } catch (error) {
        console.error('Erro no registro:', error);
        return { success: false, error: error.message || 'Erro no registro' };
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        if (this.token) {
          // Obter configuração do runtime
          const config = useRuntimeConfig();
          const AUTH_MS_URL = config.authMsUrl;

          // Chamar logout no microserviço
          await $fetch(`${AUTH_MS_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
        }
      } catch (error) {
        console.error('Erro no logout:', error);
      } finally {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;

        // Limpar localStorage
        this.clearLocalStorage();
      }
    },

    async verifyToken() {
      if (!this.token) {
        return false;
      }

      try {
        // Verificar token usando o endpoint local
        const response = await $fetch('/api/auth/verify-token', {
          method: 'POST',
          body: {
            token: this.token,
          },
        });

        if (response.success && response.data) {
          const { userId, email, name, role } = response.data;

          // Separar nome e sobrenome
          const nameParts = name.split(' ');
          const nome = nameParts[0] || '';
          const sobrenome = nameParts.slice(1).join(' ') || '';

          this.user = {
            id: userId,
            nome,
            sobrenome,
            email,
            role,
            telefone: this.user?.telefone || '',
            endereco: this.user?.endereco || {
              cep: '',
              rua: '',
              numero: '',
              complemento: '',
              bairro: '',
              cidade: '',
              estado: '',
            },
          };

          this.isAuthenticated = true;
          return true;
        }

        return false;
      } catch (error) {
        console.error('Erro na verificação do token:', error);
        this.logout();
        return false;
      }
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
