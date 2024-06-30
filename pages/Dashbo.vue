<template>
  <div>
    <div>
      <div class="lg:h-[600px] p-[20px] lg:flex justify-between items-center relative lg:flex-row-reverse md:flex-col sm:flex-col gap-[40px]">
        <img src="../assets/head.png" alt="" class="lg:w-[100%] lg:h-[500px]">
        <div class="w-full">
          <h1 class="text-4xl mb-8 text-[#faa122] font-semibold w-full">Your Perfect Electronic Device</h1>
          <p class="text-xl font-sans mb-8">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non debitis ullam commodi vero suscipit ratione!</p>
          <Button @click="fetchProductById('1')">Get Started</Button>
        </div>
      </div>
    </div>
    
    <!-- Other sections ... -->

    <div v-if="product">
      <h2>Product Details:</h2>
      <p><strong>Name:</strong> {{ product.productName }}</p>
      <p><strong>Description:</strong> {{ product.productDescription }}</p>
      <p><strong>Price:</strong> {{ product.productPrice }}</p>
    </div>

    <div>
      <div class="text-center leading-loose">
        <h1 class="text-xl py-3 text-primary">Trending Collection</h1>
        <h1 class="text-3xl text-[#faa122]">TOP SELLING ITEMS</h1>
      </div>
      <div class="py-5">
        <Card/>
      </div>
    </div>
    
    <div>
      <Discount/>
    </div>
    
    <div>
      <div class="heading"></div>
    </div>
    
    <Blogs/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useProductsStore } from '~/stores/products'; // Adjust the path according to your project structure

interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
}

const product = ref<Product | null>(null);

async function fetchProductById(productId: string) {
  const productStore = useProductsStore();
  
  try {
    product.value = await productStore.fetchProductById(productId);
  } catch (error) {
    console.error('Failed to fetch product by ID:', error);
  }
}
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
