<template>
   <UCard class="w-full rounded-none">
    <About/>
  <div class=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols justify-between items-center p-5">
 
    <div class="flex justify-center items-center gap-3">
      <UIcon name="i-mdi-twitter" dynamic class="text-3xl rounded-[50%] hover:bg-gray-200 hover:text-black duration-300"/>
    <UIcon name="i-mdi-instagram" dynamic class="text-3xl p-1 rounded-[50%] hover:bg-gray-200 hover:text-black duration-300"/>
    <UIcon name="i-mdi-facebook" dynamic class="text-3xl p-1 rounded-[50%] hover:bg-gray-200 hover:text-black duration-300"/>
    <UIcon name="i-mdi-linkedin" dynamic class="text-3xl p-1 rounded-[50%] hover:bg-gray-200 hover:text-black duration-300"/>
    </div>
    <div>
    <div class="flex gap-2 p-2 ">
      <NuxtLink to="/products" class="border-l px-2 hover:text-primary duration-300 text-xl">Shop</NuxtLink>
    <NuxtLink to="/cart" class="border-l px-2 hover:text-primary duration-300 text-xl">Cart</NuxtLink>
    </div>

    <div>
      <h2>&copy; {{ new Date().getFullYear() }} Powered by Franklin'S TECHNOLOGY</h2>
    </div>
   </div>
   
 


   <div>
   
   </div>
  </div>

</UCard>
</template>

<script lang="ts" setup>
import About from './About.vue';


</script>

<style>

</style>