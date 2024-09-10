import { defineStore } from 'pinia';
import axios from 'axios';

interface Product {
  _id: string;
  productImage: {
    public_id: string;
    url: string;
  };
  productName: string;
  productDescription: string;
  productPrice: number;
  postedAt: string;
  discountedAt?: Date;
  discountedPrice?: number;
  __v: number;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [] as Product[],
    discountedProducts: [] as Product[],
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get<ApiResponse<Product[]>>(`https://e-commerce-20lb.onrender.com/product`);
        this.products = response.data.data;

        if (process.client) {
          localStorage.setItem('products', JSON.stringify(this.products));
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          this.error = error.response.data.message;
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = 'An unexpected error occurred';
        }
      }
    },

    async addProduct(productData: FormData) {
      try {
        const response = await $fetch<ApiResponse<Product[]>>("https://e-commerce-20lb.onrender.com/product", {
          method: "POST",
          body: productData
        });
    
        if (response && response.message) {
          alert(response.message);
        } else {
          alert('Product uploaded successfully');
        }
      } catch (error) {
        console.error('Failed to upload product:', error);
        alert('Failed to upload product. Please try again later.');
      }
    },

    getProductsFromLocalStorage() {
      if (process.client) {
        const products = localStorage.getItem('products');
        if (products) {
          this.products = JSON.parse(products);
        }
      }
    },

    getDiscountedProducts() {
      const now = new Date();
      return this.products.filter(product => {
        const postedDate = new Date(product.postedAt);
        const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays >= 67;
      }).map(product => ({
        ...product,
        discountedPrice: product.productPrice * 0.80,
        discountedAt: new Date()
      }));
    },

    getFirstUploadedProduct() {
      const sortedProducts = [...this.products].sort((a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime());
      return sortedProducts[0] || null;
    },

    removeOldDiscountedProducts() {
      const now = new Date();
      this.discountedProducts = this.discountedProducts.filter(product => {
        const discountStart = new Date(product.discountedAt!);
        const timePassed = now.getTime() - discountStart.getTime();
        const daysPassed = timePassed / (1000 * 60 * 60 * 24);
        return daysPassed < 1;
      });
    },

    startDiscountTimer() {
      if (process.client) {
        setInterval(() => {
          this.removeOldDiscountedProducts();
        }, 1000 * 60 * 60 * 24); 
      }
    },

    initializeDiscountedProducts() {
      this.discountedProducts = this.getDiscountedProducts();
      this.removeOldDiscountedProducts();
      this.startDiscountTimer();
    }
  }
});
