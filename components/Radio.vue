<script setup lang="ts">
const options = [
  { value: 'email', label: 'Mobile Money', icon: 'i-heroicons-phone' },
  { value: 'sms', label: 'AirTel Money', icon: 'i-heroicons-phone' },

]

const selected = ref('sms')
</script>

<template>
  <URadioGroup v-model="selected" :options="options">
    <template #label="{ option }">
      <p class="italic">
        <UIcon :name="option.icon" />
        {{ option.label }}
      </p>
    </template>
  </URadioGroup>
</template>

<style>

</style>