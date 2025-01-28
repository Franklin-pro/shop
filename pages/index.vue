<template>
  <div>

<HomePage/>

    <header/>
  </div>
</template>

<script setup>
import HomePage from '~/components/HomePage.vue';
import data from '~/data';

const products = ref(data)
const grid = ref(false)
</script>

<style>

</style>