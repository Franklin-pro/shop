import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartContent: {},
    products: {},
    theme: 'light'
  }),
  getters: {
    formattedCart(state) {
      return Object.keys(state.cartContent).map(productId => {
        const productInCart = state.cartContent[productId];
        const product = state.products[productId];
        if (product) {
          return {
            id: product._id,
            image: product.productImage.url,
            name: product.productName,
            description: product.productDescription,
            price: product.productPrice,
            quantity: productInCart.quantity,
            total: product.productPrice * productInCart.quantity
          };
        }
        return null;
      }).filter(item => item !== null);
    },
    total(state) {
      return Object.keys(state.cartContent).reduce((acc, productId) => {
        const product = state.products[productId];
        if (product) {
          return acc + product.productPrice * state.cartContent[productId].quantity;
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
    async fetchProduct(productId) {
      if (!this.products[productId]) {
        try {
          const response = await fetch(`https://e-commerce-20lb.onrender.com/product/${productId}`);
          const product = await response.json();
          this.products[productId] = product.data; 
        } catch (error) {
          console.error('Failed to fetch product details', error);
        }
      }
    },
    async add(productId) {
      if (this.cartContent[productId]) {
        this.cartContent[productId].quantity += 1;
      } else {
        this.cartContent[productId] = {
          productId,
          quantity: 1
        };
        await this.fetchProduct(productId);
      }
    },
    async remove(productId) {
      if (!this.cartContent[productId]) {
        return;
      } else {
        this.cartContent[productId].quantity -= 1;
      }
      if (this.cartContent[productId].quantity === 0) {
        delete this.cartContent[productId];
      }
    },
    async clearCart(productId) {
      if (this.cartContent[productId]) {
        delete this.cartContent[productId];
      }
    },
// make discount 8% of totalprice of products if you buy above 5 products

    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }
  }
});
