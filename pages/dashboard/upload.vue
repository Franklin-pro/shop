<template>
  <div>
    <UploadProduct/>
  </div>
</template>

<script lang="ts" setup>
import UploadProduct from '~/components/UploadProduct.vue';
definePageMeta({
  layout:'dashboard',
  middleware:'auth'
})

</script>

<style>

</style>