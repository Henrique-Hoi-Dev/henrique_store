import { useCartStore } from '~/stores/cart';

export const useCart = () => {
  const cartStore = useCartStore();

  const addToCart = (produto, quantidade = 1) => {
    cartStore.addItem(produto, quantidade);
  };

  const removeFromCart = (produtoId) => {
    cartStore.removeItem(produtoId);
  };

  const updateQuantity = (produtoId, quantidade) => {
    cartStore.updateQuantity(produtoId, quantidade);
  };

  const clearCart = () => {
    // Save total before clearing
    const total = cartStore.totalPrice;
    localStorage.setItem('lastOrderTotal', total.toString());

    cartStore.clearCart();
  };

  const toggleCart = () => {
    cartStore.toggleCart();
  };

  const openCart = () => {
    cartStore.openCart();
  };

  const closeCart = () => {
    cartStore.closeCart();
  };

  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const calculateSubtotal = (items) => {
    return items.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  const calculateShipping = (subtotal) => {
    // Frete grátis acima de R$ 100
    return subtotal >= 100 ? 0 : 15.9;
  };

  const calculateTotal = (subtotal, shipping = 0) => {
    return subtotal + shipping;
  };

  return {
    // State
    cartItems: computed(() => cartStore.items),
    items: computed(() => cartStore.items),
    totalItems: computed(() => cartStore.totalItems),
    totalPrice: computed(() => cartStore.totalPrice),
    formattedTotalPrice: computed(() => cartStore.formattedTotalPrice),
    isEmpty: computed(() => cartStore.isEmpty),
    isOpen: computed(() => cartStore.isOpen),

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,

    // Utilities
    formatPrice,
    calculateSubtotal,
    calculateShipping,
    calculateTotal,
  };
};
