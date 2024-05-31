<template>
  <div class="flex">
    <div :class="[isOpen ? 'w-72 ' : 'w-20', 'bg-[#f8f8fa] h-full p-5 pt-8 relative duration-300 fixed overflow-y-auto']">
      <UIcon 
        name="i-ic-baseline-arrow-back-ios"
        dynamic 
        :class="[isOpen ? 'rotate-0' : 'rotate-180', 'text-2xl text-black absolute right-3 cursor-pointer z-50 bg-[#f8f8fc] p-1 rounded-md']"
        @click="toggleSidebar" 
      />
      <div class="inline-flex items-center">
        <img src="../assets/lgo.png" alt="" :class="[isOpen ? 'rotate-[360deg]' : 'w-[20%] cursor-pointer duration-500 mr-2 float-left block', 'text-2xl mr-3 w-[20%]']">
        <!-- <UIcon name="i-heroicons-shopping-cart" :class="[isOpen ? 'rotate-[360deg]' : 'text-2xl cursor-pointer duration-500 mr-2 float-left block', 'text-2xl mr-3']"/> -->
        <h1 :class="[isOpen ? 'scale-1' : 'scale-0', 'text-[#19a873] origin-left font-medium text-xl duration-300']">Franklin'shop</h1>
      </div>
      <h1 :class="[isOpen ? 'scale-1' : 'scale-0', 'text-[#688279] origin-left font-medium text-md duration-300 pt-6']">MARKETING</h1>
      <div v-for="item in items" :key="item.id">
        <NuxtLink :to="item.route">
          <div :class="[isOpen ? 'hover:bg-[#e2f0ed] hover:border-2 hover:border-green-500 w-full' :'hover:bg-[#e2f0ed]', 'inline-flex pt-4 p-2 cursor-pointer rounded-xl']">
            <UIcon :name="item.icon" dynamic :class="[isOpen ? 'rotate-[360deg]' : 'text-2xl cursor-pointer duration-500 mr-2 float-left block', 'text-2xl mr-3 text-[#688279]']"/>
            <h1 :class="[isOpen ? 'scale-1' : 'scale-0', 'text-[#688279] origin-left font-medium text-dm duration-300']">{{ item.name }}</h1>
          </div>
        </NuxtLink>
      </div>
      <h1 :class="[isOpen ? 'scale-1' : 'scale-0', 'text-[#688279] origin-left font-medium text-md duration-300 pt-6']">PAYMENT</h1>
      <div v-for="item in pay" :key="item.id">
        <NuxtLink :to="item.route">
          <div :class="[isOpen ? 'hover:bg-[#e2f0ed] hover:border-2 hover:border-green-500 w-full' :'hover:bg-green-500', 'inline-flex cursor-pointer pt-4 p-2 rounded-xl']">
            <UIcon :name="item.icon" dynamic :class="[isOpen ? 'rotate-[360deg]' : 'text-2xl cursor-pointer duration-500 mr-2 float-left block', 'text-2xl mr-3 text-[#688279]']"/>
            <h1 :class="[isOpen ? 'scale-1' : 'scale-0', 'text-[#688279] origin-left font-medium text-dm duration-300']">{{ item.name }}</h1>
          </div>
        </NuxtLink>
      </div>
      <h1 :class="[isOpen ? 'scale-1 w-full' : 'hidden', 'text-[#688279] origin-left font-medium text-md duration-300 pt-6']">SYSTEM</h1>
      <div v-for="item in system" :key="item.id">
        <NuxtLink :to="item.route">
          <div :class="[isOpen ? 'hover:bg-[#e2f0ed] hover:border-2 hover:border-green-500 w-full' :'hover:bg-green-500', 'inline-flex cursor-pointer pt-4 p-2 rounded-xl']">
            <UIcon :name="item.icon" dynamic :class="[isOpen ? 'rotate-[360deg]' : 'text-2xl cursor-pointer duration-500 mr-2 float-left block', 'text-2xl mr-3 text-[#688279]']"/>
            <h1 :class="[isOpen ? 'scale-1' : 'scale-0', 'text-[#688279] origin-left font-medium text-dm duration-300']">{{ item.name }}</h1>
          </div>
        </NuxtLink>
      </div>
      <div class="my-2 lg:my-0 pt-4 flex items-center gap-4">
        <UToggle v-model="selected" @click="toggleColorMode" on-icon="i-heroicons-moon-16-solid" off-icon="i-heroicons-sun-20-solid">
          {{ colorMode.preference === 'dark' ? 'Light' : 'Dark' }}
        </UToggle>
        <h1 :class="[isOpen ? 'scale-1' : 'scale-0', 'text-[#688279] origin-left font-medium text-dm duration-300']">darkmode</h1>
      </div>
      <div class="my-2 lg:my-0 py-5">

        <!-- <div class="inline-flex pt-4">
          <UIcon name="i-ic-twotone-log-out" dynamic :class="[isOpen ? 'rotate-[360deg]' : 'w-[40px] cursor-pointer duration-500 mr-2 float-left block', 'text-2xl mr-3']"/>
          <h1 :class="[isOpen ? 'scale-1' : 'scale-0', 'text-[#688279] origin-left font-medium text-dm duration-300 cursor-pointer hover:text-red-500']">Log Out</h1>
        </div> -->
      </div>
    </div>
   
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useColorMode } from '@vueuse/core';

import CardComponent from './CardComponent.vue';
import Charts from './Charts.vue';

const selected = ref(false);
const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const items = [
  { id: 1, name: 'Dashboard', icon: 'i-mdi-view-dashboard', route: 'Dash' },
  { id: 2, name: 'MarketPlace', icon: 'i-bi-cart-dash', route: 'MarketPlace' },
  { id: 3, name: 'Orders', icon: 'i-bi-bag-dash', route: 'Order' },
  { id: 4, name: 'Tracking', icon: 'i-mdi-book-open-page-variant', route: 'tracking' },
  { id: 5, name: 'Customers', icon: 'i-mdi-account-group-outline', route: 'Customers' },
  { id: 6, name: 'Discounts', icon: 'i-mdi-tag-heart', route: 'Discount' },
  { id: 6, name: 'Upload-Product', icon: 'i-heroicons-cloud-arrow-up-20-solid', route: 'uploadProduct' },
];

const pay = [
  { id: 1, name: 'Ledger', icon: 'i-bi-cart-dash', route: 'Ledger' },
  { id: 2, name: 'Taxes', icon: 'i-ic-baseline-attach-money', route: 'Taxe' },
];

const system = [
  { id: 1, name: 'Settings', icon: 'i-ic-twotone-settings', route: 'setting' },
];

const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
</script>

<style>
/* .fixed {
  position: fixed;
}
.overflow-y-auto {
  overflow-y: auto;
} */
</style>