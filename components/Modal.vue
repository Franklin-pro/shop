<template>
  <div>
    <Button @click="isOpen = true">
      PAY NOW
    </Button>

    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <h1>PAY WITH MOBILE MONEY</h1>
        </template>

        <template #footer>
          <div class="w-full flex gap-5">
            <div class="w-[100%] cursor-pointer" @click="handlePayment">
              <UCard class="border-2 border-green-500 hover:border-red-300">
                <h1>MoMo Mobile Money</h1>
              </UCard>
            </div>
          </div>
        </template>
      </UCard>
    </UModal>

    <div v-if="alertMessage" class="fixed bottom-0 right-0 bg-gray-500 p-3 text-white rounded-md shadow-md">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const alertMessage = ref<string | null>(null);
const user = ref<{ phoneNumber: string; email: string }>({ phoneNumber: '', email: '' });

const router = useRouter();

// Function to retrieve user data from localStorage
const setUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
};

// Hook to set user data on component mount
onMounted(() => {
  setUser();
});

// Function to handle payment
const handlePayment = async () => {
  try {
    // Retrieve cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cartItems.length === 0) {
      alertMessage.value = 'Your cart is empty.';
      return;
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    if (!totalAmount || totalAmount <= 0) {
      alertMessage.value = 'Invalid total amount.';
      return;
    }

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alertMessage.value = 'User not authenticated.';
      router.push('/login');
      return;
    }

    // Make payment request
    const response = await axios.post('http://localhost:3031/payment', {
      amount: totalAmount,
      currency: 'rwf',
      phoneNumber: user.value.phoneNumber,
      items: cartItems,
      email: user.value.email,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alertMessage.value = 'Payment successful!';
    setTimeout(() => {
      isOpen.value = false;
    }, 2000);

    // Clear cart after successful payment
    localStorage.removeItem('cart');

    router.push('/successfulPayment');

  } catch (error) {
    console.error('Error initiating payment:', error);
    router.push('/errorPayment');
    alertMessage.value = 'Failed to initiate payment.';
  }
};
</script>
