<template>
  <div class="flex">
    <div class="fixed overflow-y-auto h-full scroll-smooth focus:scroll-auto">
   
      <Sidebar />
      
    </div>


    <div class="w-full ml-72">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '~/components/Sidebar.vue';
import Profile from '~/components/Profile.vue';
import Congaturation from '~/components/Congaturation.vue';


</script>

<style scoped>
/* Add your styles here */
</style>
