<template>
  <UContainer>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols gap-4 p-2 w-full">
    <div v-for="item in products" :key="item.id">
      <div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <img class="h-48 w-full object-contain object-center" :src="item.image" alt="Product Image" />
        <div class="p-4">
          <h2 class="mb-2 text-lg font-medium truncate text-[#faa122]">{{ item.name }}</h2>
          <p class="mb-2 text-base dark:text-gray-300 text-gray-700 truncate">{{ item.description }}</p>
          <p class="mr-2 text-lg font-semibold text-primary">Price: {{ item.price }} RWF</p>
          <div class="flex items-center justify-between">
            <NuxtLink to="/products/id" class="text-md">Read More</NuxtLink>
            <UButton color="gray" @click="cartStore.add(item.id)">
              <UIcon name="i-heroicons-shopping-cart" class="text-xl" />
            </UButton>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  </UContainer>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import productsData from '~/data'; // Adjust the path as needed

const cartStore = useCartStore();
const products = ref(productsData);


</script>

<style>
/* Add your styles here */
</style>
