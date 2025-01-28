<template>
  <UContainer>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-2 w-full">
       <div v-for="product in products" :key="product._id">
          <productCard 
            :title="product.productName"
            :Image="product.productImage.url"
            :description="product.productDescription"
            :price="product.productPrice"
            tag="new"
            :productId="product._id"
          />
        </div>
      <div v-if="alertMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
      {{ alertMessage }}
    </div>
    </div>
    
  </UContainer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ProductCard from '../components/NewCard.vue';

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
