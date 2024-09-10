<template>
  <div>
    <h2 class="lg:text-4xl px-4 text-[#faa122] font-bold">Last Uploaded Product</h2>
    <div v-if="lastProduct">
      <section class="py-10 bg-gray-50 rounded-xl w-full sm:py-16 lg:py-24">
        <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div class="grid items-center grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-20">
            <div>
              <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">{{ lastProduct.productName }}</h2>
              <p class="mt-4 text-base leading-relaxed text-gray-600">{{ lastProduct.productDescription }}.</p>
              <UButton label="Order Now"/>
            </div>
            <div class="relative pl-20 pr-6 sm:pl-6 md:px-0">
              <div class="relative w-full max-w-xs mt-4 mb-10 ml-auto">
                <img class="ml-auto" :src="lastProduct.productImage.url" alt="" />
                <img class="absolute -top-4 -left-12" src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/wavey-lines.svg" alt="" />
                <div class="absolute -bottom-10 -left-16">
                  <div class="bg-gray-700 rounded-2xl max-sm:rounded-xl text-white">
                    <div class="lg:px-5 lg:py-5 max-sm:p-1">
                      <span class="block text-xl font-bold lg:text-5xl">20%</span>
                      <span class="block mt-2 font-bold text-base leading-tight">
                        <del class="text-red-400">{{ lastProduct.productPrice }} RWF</del><br />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      <p>No products have been uploaded yet.</p>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useProductsStore } from '~/stores/products';

const productsStore = useProductsStore();
productsStore.getProductsFromLocalStorage();

onMounted(() => {
  productsStore.initializeDiscountedProducts();
});

// Compute the last uploaded product
const lastProduct = computed(() => productsStore.getFirstUploadedProduct());
</script>

<style scoped>

</style>
