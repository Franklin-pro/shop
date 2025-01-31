<template>
  <section class="bg-gray-100 dark:bg-gray-400 py-10 px-6">
    <div class=" mx-auto">
      <!-- Promotions Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Loop through the last two uploaded products -->
        <div v-for="(item, index) in lastTwoProducts" :key="item._id">
  <div :class="getCardColor(index)" class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white p-8 rounded-xl overflow-hidden shadow-lg">
    <div class="flex flex-col justify-center">
      <h3 class="text-lg font-semibold">Holiday Deals</h3>
      <h2 class="text-4xl font-bold mt-2">Up to 30% off</h2>
      <p class="mt-1">{{ item.productName }}</p>
      <a href="#" @click="cartStore.add(item._id)" class="mt-4 inline-block bg-white text-center text-red-600 px-6 py-2 rounded-full font-medium">Shop Now</a>
    </div>
    <div class="flex justify-center md:justify-end">
      <img class="w-full h-auto rounded-md" :src="item.productImage.url" alt="Product Image" />
    </div>
  </div>
</div>

      </div>

      <!-- Features Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 text-center">
        <div class="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
          <span class="text-purple-600 text-3xl">📦</span>
          <h4 class="text-lg font-semibold mt-2">Curb-side pickup</h4>
        </div>
        <div class="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
          <span class="text-purple-600 text-3xl">🚚</span>
          <h4 class="text-lg font-semibold mt-2">Free shipping on orders over $50</h4>
        </div>
        <div class="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
          <span class="text-purple-600 text-3xl">💰</span>
          <h4 class="text-lg font-semibold mt-2">Low prices guaranteed</h4>
        </div>
        <div class="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
          <span class="text-purple-600 text-3xl">⏳</span>
          <h4 class="text-lg font-semibold mt-2">Available to you 24/7</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useProductsStore } from '~/stores/products';

const productsStore = useProductsStore();
const cartStore = useCartStore();
productsStore.getProductsFromLocalStorage();

onMounted(() => {
  productsStore.initializeDiscountedProducts();
});

// Get the last two uploaded products
const lastTwoProducts = computed(() => {
  const products = productsStore.discountedProducts || []; // Ensure it's an array
  return products.length > 2 ? products.slice(-2) : products; // Get the last 2 items
});

// Function to return the correct card color for each product
const getCardColor = (index: number) => {
  const colors = ['bg-linear', 'bg-second dark:bg-green-500']; // First = red, Second = green
  return colors[index] || 'bg-gray-600'; // Default to gray if index is out of range
};
</script>
<style>
.bg-image {
  background-image: url('https://static.wixstatic.com/media/c837a6_d84a631864a442a496670bc2d787c6a0~mv2.jpg/v1/fill/w_879,h_468,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_d84a631864a442a496670bc2d787c6a0~mv2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.bg-linear{
  background: linear-gradient(90deg, rgb(32, 23, 199) 0%,rgb(38, 28, 212) 0%, #971414, #bb1616);

}
@media screen and (max-width: 1024px) {
  .bg-linear{
    background: linear-gradient(90deg, rgb(32, 23, 199) 0%,rgb(38, 28, 212) 0%, #971414, #bb1616);
  }
  
}
.bg-second{
  background: linear-gradient(90deg, rgb(32, 23, 199) 0%,rgb(38, 28, 212) 0%, #978314, #b8bb16);

}
@media screen and (max-width: 1024px) {
  .bg-second{
    background: linear-gradient(90deg, rgb(32, 23, 199) 0%,rgb(38, 28, 212) 0%, #978314, #b8bb16);
  }
  
}



</style>
