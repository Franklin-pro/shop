<script setup lang="ts">
import Cart from '~/pages/cart.vue';
 
const cartStore = useCartStore()




const isOpen = ref(false)

const selected = ref(false)
</script>

<template>
  <UContainer>
    <nav class="shadow-2xl">
    <div class="flex justify-between p-5">
  <div class="flex gap-3">
    <img src="../assets/Logo-Design.png" alt="" class="w-[30px]">
    <NuxtLink to="/" class="font-sans font-bold text-2xl text-primary text-balance">Franklin's <span class="text-[#faa122]">$Hop</span></NuxtLink>
  </div>
  
  
  <div class="flex items-center gap-5">
    
    <NuxtLink to="/" :active-class="'text-[#faa122]'" class="hover:text-[#faa122] hover:animate-pulse">Home</NuxtLink>
    <NuxtLink to="/products" :active-class="'text-[#faa122]'" class="hover:text-[#faa122] hover:animate-pulse">Product</NuxtLink>
    <NuxtLink to="/products"  class="hover:text-[#faa122] hover:animate-pulse">Register</NuxtLink>

    <UButton color="gray" icon="i-heroicons-shopping-cart" @click="isOpen = true">
      <h1>{{ cartStore.productTotal }}</h1>

      </UButton>

<USlideover v-model="isOpen">
  <div class="p-4 flex-1">
   <Cart/>
  </div>
</USlideover>
    
  </div>
 </div>
  </nav>
  </UContainer>
  

</template>

<style>
</style>