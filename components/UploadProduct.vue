<template>
  <div class="flex flex-col justify-center items-center p-8 ">
    <div class="card p-9">
      <UCard>
        <h1 class="font-semibold text-2xl text-gray-900 dark:text-white leading-tight py-6">Upload Product</h1>
        <div>
          <input ref="productImage" type="file" class="block w-full bg-transparent mb-[10px] p-[8px] border rounded-md border-green-500"/>
          <input v-model="productName" placeholder="Product Name" class="block w-full bg-transparent mb-[10px] border rounded-md border-green-500 p-[8px]"/>
          <input v-model="productPrice" type="number" placeholder="Product Price" class="block w-full bg-transparent mb-[10px] p-[8px] border rounded-md border-green-500"/>
          <textarea v-model="productDescription" placeholder="Product Description" class="block w-full bg-transparent mb-[10px] p-[8px] border rounded-md border-green-500"></textarea>
        </div>
        <button @click="uploadProduct">Upload Product</button>
      </UCard>
    </div>
    <div class="p-9 w-full">
      <ProductTable/>
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
    const response:any = await useStore.addProduct(formData);
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
