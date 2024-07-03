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
  __v: number;
}

// Define the structure of the API response
interface ApiResponse<T> {
  message: string;
  data: T;
}

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [] as Product[],
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get<ApiResponse<Product[]>>(`https://e-commerce-20lb.onrender.com/product`);
        this.products = response.data.data;
   
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
          alert('Product uploaded successfully'); // Fallback message
        }
      } catch (error) {
        console.error('Failed to upload product:', error);
        alert('Failed to upload product. Please try again later.'); // User-friendly error message
      }
    },
    
    async fetchProductById(productId: string) {
      try {
        const response = await $fetch<ApiResponse<Product>>(`https://e-commerce-20lb.onrender.com/product/${productId}`);
        console.log(response.data)
      
      } catch (error) {
        console.error('Failed to fetch product by ID:', error);
        throw error;
      }
    }
    
    
  }
  
});
