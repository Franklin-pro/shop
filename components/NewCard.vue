<template>
  <div class="max-w-sm dark:shadow-xl shadow-orange-700 dark:shadow-orange-700 rounded overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 relative">
    <img class="w-full h-56 object-contain object-center" :src="Image" alt="Product Image">
    
    <!-- Hover Overlay -->
    <div class="absolute inset-0 bg-gray-500 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
      <!-- View Detail Icon -->
      <NuxtLink :to="`/products/${productId}`" class="text-white hover:text-blue-500 transition-colors duration-300">
        <UIcon name="i-heroicons-eye" class="text-2xl" />
      </NuxtLink>
      
      <!-- Favorite Icon -->
      <button @click="addToFavorites(productId)" class="text-white hover:text-red-500 transition-colors duration-300">
        <UIcon name="i-heroicons-heart" class="text-2xl" />
      </button>
      
      <!-- Add to Cart Icon -->
      <button @click="addToCart(productId)" class="text-white hover:text-green-500 transition-colors duration-300">
        <UIcon name="i-heroicons-shopping-cart" class="text-2xl" />
      </button>
    </div>

    <!-- Product Details -->
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-gray-700 truncate text-base dark:text-gray-100">
        {{ description }}
      </p>
      <div class="flex justify-between items-center pt-5">
        <strong>{{ price }} Rwf</strong>
      
      </div>
    </div>

    <div v-if="alertMessage" class="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
      {{ alertMessage }}
    </div>

  
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  price: Number,
  Image: String,
  description: String,
  tag: String,
  productId: String
});

const cartStore = useCartStore();
const alertMessage = ref<string | null>(null);

const addToCart = (productId: string) => {
  cartStore.add(productId);
  alertMessage.value = 'Product added to cart!';
  setTimeout(() => {
    alertMessage.value = null;
  }, 3000);
};

const addToFavorites = (productId: string) => {
  // Implement your favorite logic here
  alertMessage.value = 'Product added to favorites!';
  setTimeout(() => {
    alertMessage.value = null;
  }, 3000);
};
</script>

<style scoped>
/* Add any custom styles here */
</style>