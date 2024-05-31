<template>
  <div>
    <h1>hello setting</h1>
    <UploadProduct/>
  </div>
</template>

<script lang="ts" setup>
import UploadProduct from '~/components/UploadProduct.vue';

definePageMeta({
  layout:'dashboard'
})
</script>

<style>

</style>