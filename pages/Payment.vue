<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  address: string;
  houseNumber: string;
  streetNumber: string;
}

interface ApiResponse<T> {
  data: T;
}


interface Login {
  email: string;
  password: string;
}

const isOpen = ref(false);
const toast = useToast();

const cartItems = ref(0);
const totalPrice = useCartStore();
const cartStore = useCartStore();

const discount = () =>{
  if (totalPrice.total > 1000000) {
    return totalPrice.total * 0.8 ;
  } else {
    return 0;
  }
}

const alertMessage = ref<string | null>(null);

const payment = () => {
  alertMessage.value = 'Payment successfully, check on your phone';
  setTimeout(() => {
    alertMessage.value = null;
  }, 3000);
};

// Reactive user variable, initialized with an empty object
const user = ref<User>({
  fullName: '',
  email: '',
  phoneNumber: '',
  city: '',
  address: '',
  houseNumber: '',
  streetNumber: ''
});




const setUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
};



onMounted(() => {
  setUser(); 
});
</script>

<template>
  <UContainer>
    <div class="grid lg:grid-cols-2 md:grid-cols justify-center gap-5 p-5">
      <!-- User information form -->
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
        class="w-[100%]"
      >
        <template #header>
    
        </template>

        <template #footer>
          <!-- User input fields -->
          <div class="flex justify-between">
            <UInput disabled placeholder="Enter Full Name" class="p-3 w-full" v-model="user.fullName" size="lg"/>
            <UInput placeholder="Enter Phone Number" disabled class="p-3 w-full" v-model="user.phoneNumber" size="lg"/>
          </div>
          <div class="flex justify-between">
            <UInput disabled placeholder="Enter Email" class="p-3 w-full" v-model="user.email" size="lg"/>
            <UInput disabled placeholder="Enter City" class="p-3 w-full" v-model="user.city" size="lg"/>
          </div>
          <div class="flex justify-between">
            <UInput disabled placeholder="Enter Address ex:kicukiro,gatenga" class="p-3 w-full" v-model="user.address" size="lg"/>
          </div>
          <div class="flex justify-between">
            <UInput disabled placeholder="Enter House Number" class="p-3 w-full" v-model="user.houseNumber" size="lg"/>
            <UInput disabled placeholder="Enter Street Number" class="p-3 w-full" v-model="user.streetNumber" size="lg"/>
          </div>
       
          <div class="flex">
            <div>
              <h2 class="font-bold py-2">DID YOU KNOW</h2>
              <li>you can pay for your product that has reached you</li>
              <li>when we bring a product you don't like it and you can bring it back before three days</li>
              <p class="py-5">if you don't have account here? please <NuxtLink to="/createAccount" class="text-blue-500">Create Account</NuxtLink></p>
            </div>
          </div>
        </template>
      </UCard>

      <!-- Payment details and methods -->
      <UCard class="w-[100%]">
        <div class="pb-4">
          <h1 class="text-center border-b pb-2 font-black ">PAYMENT DETAILS</h1>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                
                  <th scope="col" class="px-6 py-3">
                    Product
                  </th>
             
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                
                </tr>
              </thead>
              <tbody>
                <tr  v-for="item in cartStore.formattedCart" :key="item.id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {{ item.name }}
                  </td>
            
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {{ item.price }} Rwf
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-700 dark:border-gray-900 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Total
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {{ totalPrice.total }} Rwf
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
      
        <Modal/>
 
       
      </UCard>

  
      <div v-if="alertMessage" class="alert-message">
        {{ alertMessage }}
      </div>
    </div>
  </UContainer>
</template>
