<template>

  <div class="py-5 px-9">
<div class="py-12">
  <h1 class="font-bold text-4xl text-green-500">PAYMENT HISTORY</h1>
</div>

<ol v-for="payment in paymentHIstory" class="relative border-s border-gray-200 dark:border-gray-700">                  
    <li class="mb-10 ms-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{{ payment.product }}<span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300 ms-3">{{ payment.status }}</span></h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on {{ payment.date }}</time>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{{ payment.description }}</p>
      
    </li>
 

</ol>




  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout:'dashboard',
  middleware:'auth'
})


const paymentHIstory = ref([
  {
    id:1,
    product:"I Phone 15 pro",
    date:'12/12/2023',
    amount:'$100',
    description:'Payment for service',
    status:'Paid'
  },
  {
    id:2,
    product:"Smart Watch i5",
    date:'12/12/2023',
    amount:'$100',
    description:'Payment for service',
    status:'Paid'
  },
  {
    id:3,
    product:"Mac Book Pro",
    date:'12/12/2023',
    amount:'$100',
    description:'Payment for service',
    status:'Paid'
  },
  {
    id:4,
    product:"Smart TV",
    date:'12/12/2023',
    amount:'$100',
    description:'Payment for service',
    status:'Paid'
  },
  {
    id:5,
    date:'12/12/2023',
    product:"lapTop HP i5",
    amount:'$100',
    description:'Payment for service',
    status:'Paid'
  }
])
</script>

<style>

</style>