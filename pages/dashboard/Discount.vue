<template>
  <div>
  <ProductTable/>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout:'dashboard',
  middleware:'auth',
})
</script>

<style>

</style>