import { defineStore } from 'pinia';
import axios from 'axios';

interface Blogs {
  _id: string;
  blogsImage: {
    public_id: string;
    url: string;
  };
  blogTitle: string;
  blogsDescription: string;
  postedAt: Date;
}

// Define the structure of the API response
interface ApiResponse<T> {
  message: string;
  data: T;
}

export const useBlogsStore = defineStore('blogsStore', {
  state: () => ({
    blogs: [] as Blogs[],
    error: null as string | null,
  }),
  actions: {
    async fetchBlogs() {
      try {
        const response = await axios.get<ApiResponse<Blogs[]>>('https://e-commerce-20lb.onrender.com/blog');
        this.blogs = response.data.data;
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
    
    async addProduct(blog: Blogs) {
      try {
        const response = await axios.post<ApiResponse<Blogs>>('https://e-commerce-20lb.onrender.com/blog', blog, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.blogs.push(response.data.data); // Assuming the API returns the created blog
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          this.error = error.response.data.message;
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = 'An unexpected error occurred';
        }
      }
    }
  }
});
