<template>
  <div class="p-2 width flex justify-center w-full">
    <div class="lg:w-[50%] md:w-full bg-gray-100 p-4">
      <UCard>
        <h1 class="font-bold p-3 text-3xl text-center text-[#68ae34]">UPLOAD PRODUCT</h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="flex flex-col">
          <label for="productImage" class="text-lg">Product Image</label>
          <input id="productImage" type="file" @change="handleFile" class="p-2 my-2 border border-gray-300 rounded-md" />
        </div>
        <div class="flex flex-col">
          <label for="productName" class="text-lg">Product Name</label>
          <input v-model="state.pName" id="productName" type="text" placeholder="Enter product name" class="p-2 my-2 border border-gray-300 rounded-md" />
        </div>
        <div class="flex flex-col">
          <label for="productDescription" class="text-lg">Product Description</label>
          <input v-model="state.pDesc" id="productDescription" type="text" placeholder="Enter product description" class="p-2 my-2 border border-gray-300 rounded-md" />
        </div>
        <div class="flex flex-col">
          <label for="productPrice" class="text-lg">Product Price</label>
          <input v-model="state.pPrice" id="productPrice" type="number" placeholder="Enter product price" class="p-2 my-2 border border-gray-300 rounded-md" />
        </div>
        <Button>Upload Product</Button>
      </form>
      </UCard>
     
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useProductsStore } from '~/stores/products'; // Adjust the path according to your project structure

const state = reactive({
  image: null as File | null,
  pName: '',
  pDesc: '',
  pPrice: ''
});

function handleFile(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    state.image = target.files[0];
  }
}

async function createProduct() {
  const productStore = useProductsStore();
  try {
    const formData = new FormData();
    if (state.image) {
      formData.append('productImage', state.image);
    }
    formData.append('productName', state.pName);
    formData.append('productDescription', state.pDesc);
    formData.append('productPrice', state.pPrice);

    await productStore.addProduct(formData);
  } catch (error) {
    console.error('Failed to upload product', error);
  }
}

async function onSubmit() {
  await createProduct();
}
</script>

<style scoped>
.width {
  backdrop-filter: blur(50px);
  margin: 50px auto;
  width: 80%;
  border-radius: 20px;
  padding: 50px;
  height: 600px;
}
img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
</style>
