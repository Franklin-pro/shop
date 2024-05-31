<script setup lang="ts">
import { ref } from 'vue';

import { useColorMode } from '#imports';
import Cart from '~/pages/cart.vue';

const cartStore = useCartStore();
const isOpen = ref(false);
const isMenuOpen = ref(false);
const selected = ref(false);

const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
const userStore = useUserStore();
</script>

<template>
  <UContainer>
    <nav class="shadow-xl ">
      <div class="lg:flex justify-between p-5">
        <div class="flex justify-between items-center w-full lg:w-auto">
          <div class="flex gap-3">
            <img src="../assets/lgo.png" alt="" class="w-[30px]" />
            <NuxtLink to="/" class="font-sans font-bold text-2xl text-primary text-balance">
              Franklin's <span class="text-[#faa122]">$Hop</span>
            </NuxtLink>
          </div>
          <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden focus:outline-none duration-300">
            <UIcon v-if="isMenuOpen" name="i-ic-baseline-close" class="text-2xl text-primary " dynamic/>
            <UIcon v-else name="i-ic-sharp-filter-list" class="text-2xl text-primary" dynamic/>
        
          </button>
        </div>

        <div :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="lg:flex lg:items-center w-full lg:w-auto lg:block">
          <ul class="lg:flex lg:items-center w-full lg:w-auto lg:block ">
            <li class="my-6"><NuxtLink to="/" :active-class="'text-[#faa122]'" class="hover:text-[#faa122] hover:animate-pulse mx-4">Home</NuxtLink></li>
          <li class="my-6"><NuxtLink to="/products" :active-class="'text-[#faa122]'" class="hover:text-[#faa122] hover:animate-pulse mx-4">Product</NuxtLink></li>
          <li class="my-6"><NuxtLink to="/createaccount" class="hover:text-[#faa122] hover:animate-pulse mx-4">Register</NuxtLink></li>
          <UChip :text="cartStore.productTotal" size="2xl" color="red" class="mx-4 text-red-500">
            <UButton color="gray" icon="i-heroicons-shopping-cart" @click="isOpen = true" />
  </UChip>


<USlideover v-model="isOpen" prevent-close>
  <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <div class="p-4 flex-1">
              <Cart />
            </div>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          PAYMENT METHOD
        </h3>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
      </div>
    </template>

    <Placeholder class="h-full" />
  </UCard>
</USlideover>
          <div class="my-2 lg:my-0">
            <UToggle v-model="selected" @click="toggleColorMode" on-icon="i-heroicons-moon-16-solid" off-icon="i-heroicons-sun-20-solid">
              {{ colorMode.preference === 'dark' ? 'Light' : 'Dark' }}
            </UToggle>
          </div>
          </ul>
          
          
        </div>
      </div>
    </nav>
  </UContainer>
</template>

<style>
/* Add any additional styling if needed */
</style>
