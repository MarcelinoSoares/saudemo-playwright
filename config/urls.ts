export const urls = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkoutStep1: '/checkout-step-one.html',
  checkoutStep2: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html',
  inventoryItem: (id: string) => `/inventory-item.html?id=${id}`,
};
