<template>
  <section class="bg-gray-100 dark:bg-gray-400 py-10 px-6">
    <div class=" mx-auto">
      <!-- Promotions Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Loop through the last two uploaded products -->
        <div v-for="(item, index) in lastTwoProducts" :key="item._id" :style="{ transitionDelay: `${index * 100}ms` }" v-motion :initial="{ opacity: 0, x: -50 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 200 * (index + 1) } }">
  <div :class="[colorClassesOverlay[index % colorClassesOverlay.length]]" class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-xl overflow-hidden shadow-lg">
    <div class="flex flex-col justify-center">
      <h3 class="text-lg font-semibold">Holiday Deals</h3>
      <h2 class="text-4xl font-bold mt-2 typing">Up to 30% off</h2>
      <p class="mt-1 text-xl font-bold"  :class="[colorClassesText[index % colorClassesText.length]]">{{ item.productName }}</p>
      <a href="#" @click="cartStore.add(item._id)" class="mt-4 animations inline-block bg-white text-center text-red-600 px-6 py-2 rounded-full font-medium">Shop Now</a>
    </div>
    <div class="flex h-[300px] object-cover justify-center md:justify-end">
      <img class="w-full object-contain bg-transparent h-auto rounded-md" :src="item.productImage.url" alt="Product Image" />
    </div>
  </div>
</div>

      </div>

      <!-- Features Section -->
      <div v-motion :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { delay: 200  } }"  class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 text-center">
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
  return products.length > 4 ? products.slice(-2) : products; // Get the last 2 items
});



const colorClassesOverlay = [
  "bg-red-500/10",
  "bg-yellow-500/5",
];

const colorClassesText = [
  "text-white",
  "text-gray-700",
 
];
</script>
<style>
.animations{
  background-image: linear-gradient(orange,orange);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  background-position-x:right ;
  transition: background-size 500ms;
}
.animations:hover{
  background-size: 100% 100%;
 background-position-x: left;
 color: white;

}
.typing{
  width: 20ch;
  text-wrap: nowrap;
  overflow: hidden;
  animation: typing 2s steps(20) infinite alternate, blink .5s step-end infinite alternate;

}
@keyframes typing {
  from {
    width: 0;
  }
}
@keyframes blink {
  50% {
    border-color: transparent;
  }
}




</style>
