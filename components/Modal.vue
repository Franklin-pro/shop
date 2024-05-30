<script setup lang="ts">
const isOpen = ref(false)
const toast = useToast()

import type { Avatar } from '#ui/types'

import { ref } from 'vue';

const cartItems = ref(0);
const totalPrice =useCartStore();

const addToCart = () => {
  const itemPrice = 20.00; 
  cartItems.value++;
  // totalPrice.value += itemPrice;
};

const people = [{
  id: 1,
  name: 'small'
}, {
  id: 2,
  name: 'medium'
}, {
  id: 3,
  name: 'lange xl'
}, {
  id: 4,
  name: 'lange 2xl'
}]
const color = [{
  id: 5,
  name: 'green'
}, {
  id: 6,
  name: 'blue'
}, {
  id: 7,
  name: 'black'
}, {
  id: 8,
  name: 'red'
}]



const selected = ref(people[0])
const props = defineProps({
  price:String
})
</script>


<template>
  <div>
    <UButton icon="i-heroicons-banknotes-20-solid" label="CHECK OUT" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
        <h1>PAY WITH MOBILE MONEY {{ price }}</h1>
        </template>

       

        <template #footer>
          <div class="flex justify-between">
            <UInput placeholder="Enter Full Name" class="p-3"/>
           <UInput placeholder="Enter Phone Number" class="p-3"/>
          </div>
          <div class="flex justify-between">
            <UInput placeholder="Enter Email" class="p-3"/>
           <UInput placeholder="Enter Address" class="p-3"/>
          </div>

          <div class="flex justify-between">
            <UInput placeholder="Enter House Number" class="p-3"/>
           <UInput placeholder="Enter Street Number" class="p-3"/>
          </div>
      <UInput disabled :placeholder="totalPrice.total"/>
      <div class="flex justify-between items-center">
        <UInputMenu
    v-model="selected"
    :options="people"
    value-attribute="id"
    option-attribute="name"
    class="p-3"
    placeholder="select size"
  />
  <Radio/>
          </div>
         
<div class="flex justify-center">
  <UButton>BUY RWF {{ totalPrice.total }}</UButton>
</div>
 
        </template>
      </UCard>
    </UModal>
  </div>
</template>