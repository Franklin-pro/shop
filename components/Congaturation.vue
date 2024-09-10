<!-- components/3DImage.vue -->
<template>
  <div class="image-container">
    <img :src="src" alt="3D Image" />
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.image-container {
  perspective: 1000px;
}

img {
  width: 100%;
  transform: rotateY(20deg);
  transition: transform 0.5s;
}

img:hover {
  transform: rotateY(0deg);
}
</style>
