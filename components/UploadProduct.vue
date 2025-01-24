<template>
  <div class=" ">
    <div class=" p-9">
      <UContainer>
        <h1 class="font-bold text-4xl text-green-500">UPLOAD PRODUCTS</h1>
        <div>
          <div class="flex items-center py-5 justify-center w-full">
            <label for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                    upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input ref="productImage" id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>

          <input v-model="productName" placeholder="Product Name"
            class="block w-full bg-transparent mb-[10px] border rounded-md border-gray-500 p-[8px]" />
          <input v-model="productPrice" type="number" placeholder="Product Price"
            class="block w-full bg-transparent mb-[10px] p-[8px] border rounded-md border-gray-500" />
          <textarea v-model="productDescription" placeholder="Product Description"
            class="block w-full bg-transparent mb-[10px] p-[8px] border rounded-md border-gray-500"></textarea>
        </div>
        <button @click="uploadProduct" class="bg-orange-500 w-72 py-2 rounded-md font-bold">Upload Product</button>

      </UContainer>

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useProductsStore } from '~/stores/products';
import ProductTable from './productTable.vue';

const productImage = ref<HTMLInputElement | null>(null);
const productName = ref<string>('');
const productPrice = ref<number | null>(null);
const productDescription = ref<string>('');

const useStore = useProductsStore();

const uploadProduct = async () => {
  if (!productName.value || !productPrice.value || !productDescription.value || !productImage.value?.files?.[0]) {
    alert('Please fill in all fields');
    return;
  }

  const formData = new FormData();
  formData.append('productImage', productImage.value.files[0]);
  formData.append('productName', productName.value);
  formData.append('productPrice', productPrice.value.toString());
  formData.append('productDescription', productDescription.value);

  try {
    const response: any = await useStore.addProduct(formData);
    if (response) {
      alert('Product uploaded successfully');
    }
    resetForm();
  } catch (error) {
    console.error('Failed to upload product:', error);
    alert('Failed to upload product. Please try again later.');
  }
};

const resetForm = () => {
  productName.value = '';
  productPrice.value = null;
  productDescription.value = '';
  if (productImage.value) {
    productImage.value.value = '';
  }
};
</script>



<style scoped>
.card button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
