<template>
  <div class="container mx-auto px-4">
    <!-- Categories Tabs -->
    <div class="border-b flex flex-wrap items-center justify-between border-gray-200 dark:border-gray-700">
      <ul class="flex flex-nowrap overflow-x-auto space-x-4 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li v-for="category in categories" :key="category.name">
          <span 
            @click="setActiveCategory(category.value)" 
            :class="{
              'inline-block p-3 border-b-2 rounded-t-lg': true,
              'text-blue-600 border-blue-600': activeCategory === category.value,
              'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300': activeCategory !== category.value
            }"
            class="cursor-pointer whitespace-nowrap"
          >
            {{ category.name }}
          </span>
        </li>
      </ul>
      <div class="mt-4 md:mt-0">
        <button class="animation-button">View All Products</button>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid py-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5">
      <div  v-motion :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { delay: 200 * (index + 1) } }" v-for="(product,index) in products.slice(0, 6)" :key="product._id">
        <ProductCard 
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

  <!-- Alert Message -->
  <div v-if="alertMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
    {{ alertMessage }}
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ProductCard from '../components/NewCard.vue';

const categories = [
  { name: 'All', value: 'all' },
  { name: 'TV Screen', value: 'tv' },
  { name: 'Head Phone', value: 'headphone' },
  { name: 'Watchs', value: 'watch' },
  { name: 'Mobile', value: 'mobile' },
  { name: 'Laptop', value: 'laptop' }
];

const activeCategory = ref('all');
const setActiveCategory = (category: string) => {
  activeCategory.value = category;
};

const productsStore = useProductsStore();
const cartStore = useCartStore();
const products = ref<Product[]>([]);
const alertMessage = ref<string | null>(null);

onMounted(async () => {
  await productsStore.fetchProducts();
  products.value = productsStore.products.slice().reverse(); // Newest products first
});

const addToCart = (productId: string) => {
  cartStore.add(productId);
  alertMessage.value = 'Product added to cart!';
  setTimeout(() => {
    alertMessage.value = null;
  }, 3000);
};
</script>

<style scoped>
/* Button styles */
.animation-button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.animation-button:hover {
  background-color: #0056b3;
}

.animation-button:active {
  transform: scale(0.95);
}

/* Scrollbar for category tabs */
ul::-webkit-scrollbar {
  height: 4px;
}

ul::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 8px;
}
</style>
