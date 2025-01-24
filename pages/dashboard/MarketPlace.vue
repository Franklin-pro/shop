<template>
  <div>
    <h1>Hello world</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout:'dashboard',
  middleware:'auth'
})

const trackingStore = useUserStore();

onMounted(async () => {
  await trackingStore.fetchTrackingProducts()
})
const trackingProducts = computed(() => trackingStore.tracking);
</script>

<style>

</style>