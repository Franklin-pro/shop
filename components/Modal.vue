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
            <div class="w-[100%] cursor-pointer" @click="handlePayment(user.phoneNumber)">
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
const handlePayment = async (phoneNumber: string) => {
  try {
    // Retrieve cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    // Calculate total amount
    const totalAmount = cartItems.reduce((acc:any, item:any) => acc + item.price * item.quantity, 0);

    // Make payment request
    const response = await axios.post('https://e-commerce-20lb.onrender.com/payment', {
      amount: totalAmount,
      currency: 'rwf',
      phoneNumber: user.value.phoneNumber,
      items: cartItems,
      email: user.value.email,
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
    router.push('/errorPayment')
    alertMessage.value = 'Failed to initiate payment.';
  }
};
</script>
