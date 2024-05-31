<template>
  <div>
    <div v-if="cartStore.formattedCart.length">
      <div v-for="item in cartStore.formattedCart" :key="item._id">
        <!-- Your cart item display code -->
      </div>
    </div>

    <div class="py-5 flex justify-around items-center">
      <h2 class="font-semibold">TOTAL Price: <span class="text-primary">{{ cartStore.total }} RWF</span></h2>
      <UButton icon="i-heroicons-banknotes-20-solid" label="CHECK OUT" @click="checkout" />
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/carts';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const checkout = () => {
  // Save cart data in localStorage
  localStorage.setItem('cart', JSON.stringify(cartStore.formattedCart));

  // Redirect to payment page
  router.push('/Payment');
};
</script>
