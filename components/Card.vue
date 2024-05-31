<template>
  <UContainer>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-2 w-full">
      <div v-for="item in products" :key="item._id">
        <div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
          <img class="h-48 w-full object-contain object-center" :src="item.productImage.url" alt="Product Image" />
          <div class="p-4">
            <h2 class="mb-2 text-lg font-medium truncate text-[#faa122]">{{ item.productName }}</h2>
            <p class="mb-2 text-base dark:text-gray-300 text-gray-700 truncate">{{ item.productDescription }}</p>
            <p class="mr-2 text-lg font-semibold text-primary">Price: {{ item.productPrice }} RWF</p>
            <div class="flex items-center justify-between">
              <NuxtLink :to="`/products/${item._id}`" class="text-md">Read More</NuxtLink>
              <UButton color="gray" @click="addToCart(item._id)">
                <UIcon name="i-heroicons-shopping-cart" class="text-xl" />
              </UButton>
            
            </div>
          </div>
        </div>
      </div>
      <div v-if="alertMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
      {{ alertMessage }}
    </div>
    </div>
    
  </UContainer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface ProductImage {
  url: string;
}

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productImage: ProductImage;
  productPrice: number;
}

const productsStore = useProductsStore();
const cartStore = useCartStore();

const products = ref<Product[]>([]);
const alertMessage = ref<string | null>(null);

onMounted(async () => {
  await productsStore.fetchProducts();
  products.value = productsStore.products.slice().reverse();
});

const addToCart = (productId: string) => {
  cartStore.add(productId);
  alertMessage.value = 'Product added to cart!';
  setTimeout(() => {
    alertMessage.value = null;
  }, 3000);
};
</script>

<style>
/* Add your styles here */
</style>
