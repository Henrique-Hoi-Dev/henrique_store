import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false,
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantidade, 0);
    },

    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.preco * item.quantidade;
      }, 0);
    },

    formattedTotalPrice: (state) => {
      const total = state.items.reduce((total, item) => {
        return total + item.preco * item.quantidade;
      }, 0);
      return `R$ ${total.toFixed(2).replace('.', ',')}`;
    },

    isEmpty: (state) => {
      return state.items.length === 0;
    },
  },

  actions: {
    addItem(produto, quantidade = 1) {
      const existingItem = this.items.find((item) => item.id === produto.id);

      if (existingItem) {
        existingItem.quantidade += quantidade;
      } else {
        this.items.push({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem,
          quantidade: quantidade,
        });
      }

      // Salvar no localStorage
      this.saveToLocalStorage();
    },

    removeItem(produtoId) {
      const index = this.items.findIndex((item) => item.id === produtoId);
      if (index > -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    updateQuantity(produtoId, quantidade) {
      const item = this.items.find((item) => item.id === produtoId);
      if (item) {
        if (quantidade <= 0) {
          this.removeItem(produtoId);
        } else {
          item.quantidade = quantidade;
          this.saveToLocalStorage();
        }
      }
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    toggleCart() {
      this.isOpen = !this.isOpen;
    },

    openCart() {
      this.isOpen = true;
    },

    closeCart() {
      this.isOpen = false;
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items));
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('cart');
        if (saved) {
          this.items = JSON.parse(saved);
        }
      }
    },
  },
});
