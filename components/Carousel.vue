<template>
  <UContainer>
    <div class="container mx-auto px-4">
     <!-- categories tabs -->


     <div class="border-b flex flex-wrap items-center justify-between border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li v-for="category in categories" :key="category.name" class="mr-2">
        <span href="#" @click="setActiveCategory(category.value)" :class="{
          'inline-block p-4 border-b-2 rounded-t-lg': true,
          'text-blue-600 border-blue-600': activeCategory === category.value,
          'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300': activeCategory !== category.value
        }">{{ category.name }}</span>
      </li>
    </ul>
    <div>
        <button class="animation-button" @click="$router.push('/products')">View All Products</button>
    </div>
</div>

      
      <div class="grid grid-cols-1 pt-5 md:grid-cols-3 gap-4">
        <div v-for="product in products.slice(0, 6)" :key="product._id">
          <productCard 
            :title="product.productName"
            :Image="product.productImage.url"
            :description="product.productDescription"
            :price="product.productPrice"
            tag="new"
            :productId="product._id"
          />
        </div>
      </div>
    </div>
    <div v-if="alertMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
      {{ alertMessage }}
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ProductCard from '../components/NewCard.vue';

interface ProductImage {
  url: string;
}

const categories = [
  { name: 'All',
  value: 'all'
   },
  { name: 'TV Screen',value:'tv' },
  { name: 'Head Phone',value:'headphone'  },
  { name: 'Watchs',value:'watch'  },
  { name: 'Mobile',value:'mobile'  },
  { name: 'Laptop',value:'laptop'  }

];
const activeCategory = ref('all');
const setActiveCategory = (category: string) => {
  activeCategory.value = category;
};

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productImage: ProductImage;
  productPrice: number;
}

const productsStore = useProductsStore();
const cartStore = useCartStore();

const products = ref<Product[]>([]);
const alertMessage = ref<string | null>(null);

onMounted(async () => {
  await productsStore.fetchProducts();
  // Reverse the order of products to display the newest first
  products.value = productsStore.products.slice().reverse();
});

const addToCart = (productId: string) => {
  cartStore.add(productId);
  alertMessage.value = 'Product added to cart!';
  setTimeout(() => {
    alertMessage.value = null;
  }, 3000);
};



</script>

<style>
.animation-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.animation-button:active {
  transform: scale(0.95);
}

.animation-button:hover {
  background-color: #0056b3;
}
</style>