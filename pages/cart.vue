<template>
  <div>
    <div>
  
</div>
    <div v-if="cartStore.formattedCart.length">
<div v-for="item in cartStore.formattedCart" :key="item.id">
 <div class="flex justify-center p-2">
 
  <UCard>
    <div class="flex gap-5 items-center">
      <div >
      <img :src="item.image" alt="image" class="w-[100px] rounded-md">
    </div>
    <div>
      <h2 class="font-semibold py-3">{{ item.name }}</h2>
      <p class="text-gray-300 ">{{ item.description }}</p>
    </div>
    <div class="flex flex-col">
      <UIcon name="i-heroicons-minus-16-solid" @click="cartStore.remove(item.id)"/>
      <span class="text-primary">{{ item.quantity }}</span>
      <UIcon name="i-heroicons-plus-16-solid" @click="cartStore.add(item.id)"/>
    </div>
    </div>
   
   <template #footer>
   <h1>{{ item.price }} RWF</h1>
   </template>
   
  </UCard>
 </div>
  
</div>
    </div>
 

   
<div class="py-5 flex justify-around items-center">
  <h2>TOTAL Price : {{ cartStore.total }} RWF</h2>
  <Modal/>
</div>
    
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/carts';
const cartStore = useCartStore()
</script>

<style>

</style>
