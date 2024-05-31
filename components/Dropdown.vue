<script setup >
import { defineProps, ref } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});



</script>

<template>
  <UDropdown :items="props.items" v-bind:popper="{ placement: 'bottom-start' }" >
    <UButton  color="white" :label="props.label" trailing-icon="i-heroicons-chevron-down-20-solid"/>
  </UDropdown>
</template>

<style>
/* Add your styles here if needed */
</style>
