import { useUserStore } from '~/stores/user';

export const useAuth = () => {
  const userStore = useUserStore();

  const login = async (credentials) => {
    return await userStore.login(credentials);
  };

  const register = async (userData) => {
    return await userStore.register(userData);
  };

  const logout = () => {
    userStore.logout();
  };

  const updateProfile = async (profileData) => {
    return await userStore.updateProfile(profileData);
  };

  const changePassword = async (passwordData) => {
    return await userStore.changePassword(passwordData);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Mínimo 8 caracteres, pelo menos uma letra e um número
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = remainder < 2 ? 0 : remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = remainder < 2 ? 0 : remainder;

    return (
      parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2
    );
  };

  const validatePhone = (phone) => {
    // Remove caracteres não numéricos
    phone = phone.replace(/[^\d]/g, '');

    // Verifica se tem 10 ou 11 dígitos (com DDD)
    return phone.length >= 10 && phone.length <= 11;
  };

  const formatCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Aplica máscara
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone) => {
    // Remove caracteres não numéricos
    phone = phone.replace(/[^\d]/g, '');

    // Aplica máscara
    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone;
  };

  const formatCEP = (cep) => {
    // Remove caracteres não numéricos
    cep = cep.replace(/[^\d]/g, '');

    // Aplica máscara
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return {
    // State
    user: computed(() => userStore.user),
    isAuthenticated: computed(() => userStore.isAuthenticated),
    isAdmin: computed(() => userStore.isAdmin),
    userFullName: computed(() => userStore.userFullName),
    userInitials: computed(() => userStore.userInitials),
    loading: computed(() => userStore.loading),

    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,

    // Validations
    validateEmail,
    validatePassword,
    validateCPF,
    validatePhone,

    // Formatters
    formatCPF,
    formatPhone,
    formatCEP,
  };
};
