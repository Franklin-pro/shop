<template>
  <div class="p-6">
    <h1>customers Page</h1>
  <CustomerT/>
  </div>
</template>

<script lang="ts" setup>
import CustomerT from '~/components/CustomerT.vue';

definePageMeta({
  layout:'dashboard'
})
</script>

<style>

</style>