<script setup lang="ts">
import { ref } from 'vue';

import { useColorMode } from '#imports';

const cartStore = useCartStore();
const isMenuOpen = ref(false);
const selected = ref(false);

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
  <UContainer>
    <nav class="shadow-xl ">
      <div class="lg:flex justify-between p-5">
        <div class="flex justify-between items-center w-full lg:w-auto">
          <div class="flex gap-3">
            <img src="../assets/lgo.png" alt="" class="w-[30px]" />
            <NuxtLink to="/" class="font-sans font-bold text-2xl text-primary text-balance">
              F<span class="text-[#faa122]">$€</span>
            </NuxtLink>
          </div>
          <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden focus:outline-none duration-300">
            <UIcon v-if="isMenuOpen" name="i-ic-baseline-close" class="text-2xl text-primary " dynamic />
            <UIcon v-else name="i-ic-sharp-filter-list" class="text-2xl text-primary" dynamic />

          </button>
        </div>

        <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
          class="xl:flex lg:items-center w-full lg:w-auto lg:block">
          <ul class="xl:flex lg:items-center w-full lg:w-auto lg:block ">
            <li class="my-6">
              <NuxtLink to="/" :active-class="'text-[#faa122]'" class="hover:text-[#faa122] hover:animate-pulse mx-4">
                Home</NuxtLink>
            </li>
            <li class="my-6">
              <NuxtLink to="/products" :active-class="'text-[#faa122]'"
                class="hover:text-[#faa122] hover:animate-pulse mx-4">Product</NuxtLink>
            </li>
            <li class="my-6">
              <NuxtLink to="/createaccount" class="hover:text-[#faa122] hover:animate-pulse mx-4">Register</NuxtLink>
            </li>
            <UChip :text="cartStore.productTotal" size="2xl" color="red" class="mx-4 text-red-500">
              <UButton color="gray" name="cart" icon="i-heroicons-shopping-cart" @click="navigation" />
            </UChip>
            <div class="my-2 lg:my-0">
              <UToggle v-model="selected" @click="toggleColorMode" on-icon="i-heroicons-moon-16-solid"
                off-icon="i-heroicons-sun-20-solid">
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
