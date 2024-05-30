import { defineStore } from 'pinia'
import products from '~/data'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartContent: {},
    theme: 'light'
  }),
  getters: {
    formattedCart(state) {
      return Object.keys(state.cartContent).map(productId => {
        const productInCart = state.cartContent[productId];
        const product = products.find(p => p.id === parseInt(productId));

        return {
          id: product.id,
          image: product.image,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: productInCart.quantity,
          total: product.price * productInCart.quantity
        };
      });
    },
    total(state) {
      return Object.keys(state.cartContent).reduce((acc, productId) => {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
          return acc + product.price * state.cartContent[productId].quantity;
        }
        return acc;
      }, 0);
    },
    productTotal(state) {
      return Object.keys(state.cartContent).reduce((acc, productId) => {
        return acc + state.cartContent[productId].quantity;
      }, 0);
    },
    getTheme(state) {
      return state.theme;
    }
  },
  actions: {
    add(productId) {
      if (this.cartContent[productId]) {
        this.cartContent[productId].quantity += 1;
      } else {
        this.cartContent[productId] = {
          productId,
          quantity: 1
        };
      }
    },
    remove(productId) {
      if (!this.cartContent[productId]) {
        return;
      } else {
        this.cartContent[productId].quantity -= 1;
      }
      if (this.cartContent[productId].quantity === 0) {
        delete this.cartContent[productId];
      }
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }
  }
});
