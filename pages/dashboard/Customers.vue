<template>
  <div class="p-6">
  <CustomerT/>
  </div>
</template>

<script lang="ts" setup>
import CustomerT from '~/components/CustomerT.vue';

definePageMeta({
  layout:'dashboard',
  middleware:'auth'
})
</script>

<style>

</style>