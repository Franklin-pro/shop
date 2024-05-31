<template>
  <nav class="navbar">
    <div class="container">
      <h1 class="navbar-title">{{ title }}</h1>
      <button class="navbar-button" @click="buttonClick">{{ buttonText }}</button>
    </div>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Define the properties
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'Navbar Title'
  },
  buttonText: {
    type: String,
    required: true,
    default: 'Click Me'
  }
})

// Define the emits
const emit = defineEmits(['buttonClick'])

// Emit the click event
const buttonClick = () => {
  emit('buttonClick')
}
</script>

<style scoped>
.navbar {
  background-color: #c67575;
  color: white;
  padding: 1rem;
  width: 100%;

}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: red;
 
}
.navbar-title {
  margin: 0;
}
.navbar-button {
  background-color: #555;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.navbar-button:hover {
  background-color: #777;
}
</style>
