<template>
  <div>
    <UContainer as="section">
<HomePage/>
    
        <div>
      <div v-for="item in products" :key="item.id">
        
          <!-- <Card/> -->
   

        
      </div>
     </div>
     
     
    </UContainer>

    <header/>
  </div>
</template>

<script setup>
import HomePage from '~/components/HomePage.vue';
import data from '~/data';

const products = ref(data)
const grid = ref(false)
</script>

<style>

</style>