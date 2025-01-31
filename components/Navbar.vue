<script setup lang="ts">
import { ref } from 'vue';

import { useColorMode } from '#imports';

const cartStore = useCartStore();
const isMenuOpen = ref(false);
const selected = ref(false);


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};

const router = useRouter();

const navigation = () => {
  router.push('/cart')
}
</script>

<template>
  <nav class=" shadow-md dark:shadow-md shadow-orange-700 dark:shadow-orange-700 lg:text-left   backdrop-blur-lg sticky top-0 z-50 dark:bg-gray-800">
    <div class=" mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo/Brand -->
        <div class="text-3xl text-orange-500 font-bold">Franklin-Shop</div>

        <!-- Desktop Menu (Hidden on Mobile) -->
        <div class="hidden font-bold md:flex space-x-6">
          <a href="/" class="hover:text-gray-300">Home</a>
          <a href="/" class="hover:text-gray-300">Shop</a>
          <a href="/" class="hover:text-gray-300">Products</a>
          <a href="/" class="hover:text-gray-300">Blog</a>
          <a href="/" class="hover:text-gray-300">Pages</a>
          <a href="/" class="hover:text-gray-300">Buy Theme</a>
        </div>
     

        <!-- Icons (Hidden on Mobile) -->
        <div class="hidden md:flex items-center space-x-2">
          <div class="flex gap-5">
          <button class=" bg-blue-500 px-6 rounded-md font-bold py-2">Login</button>
          <button class="border px-6 rounded-md font-bold py-2">Register</button>
        </div>
          <UChip :text="cartStore.productTotal" size="2xl" color="red" class="mx-4 text-red-500">
              <UButton color="gray" name="cart" icon="i-heroicons-shopping-cart" @click="navigation" />
            </UChip>
            <div class="my-2 lg:my-0">
              <UToggle v-model="selected" @click="toggleColorMode" on-icon="i-heroicons-moon-16-solid"
                off-icon="i-heroicons-sun-20-solid">
                {{ colorMode.preference === 'dark' ? 'Light' : 'Dark' }}
              </UToggle>
            </div>
            
        </div>
     
  

        <!-- Mobile Menu Button (Visible on Mobile) -->
        <button @click="toggleMenu" class="md:hidden focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu (Hidden by Default) -->
      <div v-if="isMenuOpen" class="md:hidden">
        <div class="flex font-bold flex-col space-y-2 mt-2">
          <a href="#" class="hover:text-gray-700">Home</a>
          <a href="#" class="hover:text-gray-700">Shop</a>
          <a href="#" class="hover:text-gray-700">Products</a>
          <a href="#" class="hover:text-gray-700">Blog</a>
          <a href="#" class="hover:text-gray-700">Pages</a>
          <a href="#" class="hover:text-gray-700">Buy Theme</a>
        </div>
        <div class=" flex py-4 md:flex space-x-2">
          <UChip :text="cartStore.productTotal" size="2xl" color="red" class="mx-4 text-red-500">
              <UButton color="gray" name="cart" icon="i-heroicons-shopping-cart" @click="navigation" />
            </UChip>
            <div class="my-2 lg:my-0">
              <UToggle v-model="selected" @click="toggleColorMode" on-icon="i-heroicons-moon-16-solid"
                off-icon="i-heroicons-sun-20-solid">
                {{ colorMode.preference === 'dark' ? 'Light' : 'Dark' }}
              </UToggle>
            </div>
            <div class="flex gap-5">
          <button class=" bg-blue-500 px-6 rounded-md font-bold py-2">Login</button>
          <button class="border px-6 rounded-md font-bold py-2">Register</button>
        </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
/* Add any additional styling if needed */
</style>
