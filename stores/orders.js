import { defineStore } from 'pinia';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    currentOrder: null,
    loading: false,
  }),

  getters: {
    totalOrders: (state) => {
      return state.orders.length;
    },

    pendingOrders: (state) => {
      return state.orders.filter((order) => order.status === 'pending');
    },

    completedOrders: (state) => {
      return state.orders.filter((order) => order.status === 'completed');
    },

    cancelledOrders: (state) => {
      return state.orders.filter((order) => order.status === 'cancelled');
    },

    ordersByStatus: (state) => (status) => {
      return state.orders.filter((order) => order.status === status);
    },
  },

  actions: {
    async createOrder(orderData) {
      this.loading = true;
      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newOrder = {
          id: Date.now().toString(),
          ...orderData,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          trackingCode: this.generateTrackingCode(),
        };

        this.orders.unshift(newOrder);
        this.currentOrder = newOrder;

        // Salvar no localStorage
        this.saveToLocalStorage();

        return { success: true, order: newOrder };
      } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    async updateOrderStatus(orderId, status) {
      this.loading = true;
      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 500));

        const order = this.orders.find((o) => o.id === orderId);
        if (order) {
          order.status = status;
          order.updatedAt = new Date().toISOString();

          // Salvar no localStorage
          this.saveToLocalStorage();
        }

        return { success: true };
      } catch (error) {
        console.error('Erro ao atualizar status:', error);
        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    async cancelOrder(orderId) {
      return this.updateOrderStatus(orderId, 'cancelled');
    },

    async completeOrder(orderId) {
      return this.updateOrderStatus(orderId, 'completed');
    },

    async getOrderById(orderId) {
      const order = this.orders.find((o) => o.id === orderId);
      if (order) {
        this.currentOrder = order;
        return order;
      }
      return null;
    },

    async getUserOrders(userId) {
      this.loading = true;
      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filtrar pedidos do usuário
        const userOrders = this.orders.filter(
          (order) => order.userId === userId
        );
        return userOrders;
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return [];
      } finally {
        this.loading = false;
      }
    },

    generateTrackingCode() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },

    getStatusColor(status) {
      const colors = {
        pending: 'text-yellow-600 bg-yellow-100',
        processing: 'text-blue-600 bg-blue-100',
        shipped: 'text-purple-600 bg-purple-100',
        delivered: 'text-green-600 bg-green-100',
        completed: 'text-green-600 bg-green-100',
        cancelled: 'text-red-600 bg-red-100',
      };
      return colors[status] || 'text-gray-600 bg-gray-100';
    },

    getStatusText(status) {
      const texts = {
        pending: 'Pendente',
        processing: 'Processando',
        shipped: 'Enviado',
        delivered: 'Entregue',
        completed: 'Concluído',
        cancelled: 'Cancelado',
      };
      return texts[status] || status;
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('orders', JSON.stringify(this.orders));
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('orders');
        if (saved) {
          this.orders = JSON.parse(saved);
        }
      }
    },

    clearOrders() {
      this.orders = [];
      this.currentOrder = null;
      if (process.client) {
        localStorage.removeItem('orders');
      }
    },
  },
});
