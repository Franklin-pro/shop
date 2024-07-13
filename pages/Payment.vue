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

const fetchUser = async (data: Login) => {
  try {
    // Perform login
    const loginResponse = await axios.post("https://e-commerce-20lb.onrender.com/user/login", data);
    
    if (loginResponse.status === 200) {
      const userResponse = await axios.get<ApiResponse<User>>("https://e-commerce-20lb.onrender.com/user");
      user.value = loginResponse.data.data.user;
      localStorage.setItem('user', JSON.stringify(user.value)); 
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

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
            <UInput disabled placeholder="Enter Full Name" class="p-3 w-full" v-model="user.fullName" />
            <UInput disabled placeholder="Enter Phone Number" class="p-3 w-full" v-model="user.phoneNumber" />
          </div>
          <div class="flex justify-between">
            <UInput disabled placeholder="Enter Email" class="p-3 w-full" v-model="user.email" />
            <UInput disabled placeholder="Enter City" class="p-3 w-full" v-model="user.city" />
          </div>
          <div class="flex justify-between">
            <UInput disabled placeholder="Enter Address ex:kicukiro,gatenga" class="p-3 w-full" v-model="user.address" />
          </div>
          <div class="flex justify-between">
            <UInput disabled placeholder="Enter House Number" class="p-3 w-full" v-model="user.houseNumber" />
            <UInput disabled placeholder="Enter Street Number" class="p-3 w-full" v-model="user.streetNumber" />
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
        <h1>PAYMENT METHODS</h1>
        <!-- Cart items -->
        <div
          v-if="cartStore.formattedCart.length"
          class="flex gap-5 flex-col py-4"
        >
          <div
            v-for="item in cartStore.formattedCart"
            :key="item?.id"
            class="flex items-center gap-4 justify-between p-2"
          >
            <div class="">
              <h1 class="font-sans font-semibold">{{ item?.name }}</h1>
              <div class="flex items-center gap-5 text-xl border rounded-xl">
                <UIcon
                  name="i-heroicons-minus-16-solid"
                  @click="cartStore.remove(item?.id)"
                />
                <span class="text-primary">{{ item?.quantity }}</span>
                <UIcon
                  name="i-heroicons-plus-16-solid"
                  @click="cartStore.add(item?.id)"
                />
              </div>
            </div>
            <div class="">
              <h1>{{ item?.price }}</h1>
            </div>
          </div>
          <h2>
            TOTAL : <span class="font-bold"><span class="text-primary">{{ totalPrice.total }} RWF</span></span>
          </h2>
        </div>

        <!-- Payment status and button -->
        <div>
          <h1 class="font-bold py-2">STATUS PAYMENT</h1>
          <h1 class="text-md font-sans"></h1>
          <h1 class="text-xl font-sans py-3">
            Discount: <span class="text-primary">0</span>
          </h1>
        </div>
        <Modal/>
        <!-- <button @click="payment">Make Payment</button> -->
       
      </UCard>

      <!-- Alert message -->
      <div v-if="alertMessage" class="alert-message">
        {{ alertMessage }}
      </div>
    </div>
  </UContainer>
</template>
