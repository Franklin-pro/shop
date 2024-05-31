<template>
  <div v-if="product">
    <div class="grid grid-cols-2 gap-[10vw]">
      <div class="p-7">
        <img
          :src="product.blogsImage.url"
          alt="product img"
          class="mx-auto my-7 rounded-lg"
        />
      </div>
      <div class="p-7">
        <h2 class="font-bold text-primary text-3xl py-5">{{ product.blogTitle }}</h2>
        <p class="text-xl my-7 py-5">
          {{ product.blogsDescription }}
        </p>
        <!-- <h3 class="font-bold border-b-2 mb-4 pb-2">
          Product Details:
          <span class="font-semibold text-primary text-2xl pb-2">{{ product.productPrice }} RWF</span>
        </h3> -->
<Button @click="cartStore.add(product._id)"> <UIcon name="i-heroicons-shopping-cart" class="text-xl"/> Add Cart</Button>
    
      </div>
    </div>


  </div>
  
  <div v-else>
    <div class="flex gap-4 items-center justify-center p-6">
      <div class="w-[20px] h-[20px] bg-gray-400 rounded-[50%] animate-bounce"></div>
      <div class="w-[20px] h-[20px] bg-gray-400 rounded-[50%] animate-bounce"></div>
    <div class="w-[20px] h-[20px] bg-gray-400 rounded-[50%] animate-bounce"></div>
    <h1 class="text-gray-500">Loading...</h1>
    
    </div>
  </div>
</template>


<script setup>
import { useCartStore } from '#imports';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const cartStore = useCartStore()
const route = useRoute();
const { id } = route.params;

const product = ref(null);
const error = ref(null);

const fetchProductById = async (blogId) => {
  try {
    const response = await $fetch(`http://localhost:3031/blog/${blogId}`);
    product.value = response.data;
  } catch (err) {
    console.error('Failed to fetch product by ID:', err);
    error.value = 'Failed to load product.';
  }
};

onMounted(() => {
  fetchProductById(id);
});
</script>


<style scoped>
img {
  max-width: 400px;
}
</style>
