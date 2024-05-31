<template>
  <div class="flex justify-center items-center py-8">
    <UCard>
      <h1>Upload Product</h1>
      <div>
        <UInput v-model="productImage" type="file" size="sm" icon="i-heroicons-folder" class="p-3" />
        <UInput v-model="productName" placeholder="Product Name" class="p-3" />
        <UInput v-model="productPrice" type="number" placeholder="Product Price" class="p-3" />
        <UTextarea v-model="productDescription" placeholder="Product Description" class="p-3" />
      </div>
      <Button @click="uploadProduct">Upload Product</Button>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const productImage = ref<HTMLInputElement | null>(null);
const productName = ref<string>('');
const productPrice = ref<number | null>(null);
const productDescription = ref<string>('');

const useStore = useProductsStore();

const uploadProduct = async () => {
  if (!productName.value || !productPrice.value || !productDescription.value || !productImage.value?.files?.[0]) {
    console.error('Please fill in all fields');
    return;
  }

  const formData = new FormData();
  formData.append('productImage', productImage.value.files[0]);
  formData.append('productName', productName.value);
  formData.append('productPrice',productPrice.value.toString());
  formData.append('productDescription', productDescription.value);

  try {
    await useStore.addProduct(formData);
    resetForm();
  } catch (error) {
    console.error('Failed to upload product:', error);
  }
};

const resetForm = () => {
  productName.value = '';
  productPrice.value = null;
  productDescription.value = '';
  if (productImage.value) {
    productImage.value.value = ''; // Clear file input
  }
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
