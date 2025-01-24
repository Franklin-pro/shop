<template>

  <UContainer>
    <div>
      <div v-if="cartStore.formattedCart.length" class=" space-y-4">
        <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-16 py-3">
                    <span class="sr-only">Image</span>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="item in cartStore.formattedCart" :key="item._id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="p-4">
                    <img :src="item.image" class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch">
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {{ item.name }}
                  </td>
                  <td class="px-6 py-4 ">
                    <div class="flex items-center justify-center w-full border rounded-md gap-5 text-xl">
                      <UIcon name="i-heroicons-minus-16-solid" @click="cartStore.remove(item?.id)" />
                      <span class="text-primary">{{ item?.quantity }}</span>
                      <UIcon name="i-heroicons-plus-16-solid" @click="cartStore.add(item?.id)" />
                    </div>
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {{ item.price }} Rwf
                  </td>
                  <td class="px-6 py-4">
                    <a href="#" @click="cartStore.clearCart(item?.id)"
                      class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Total
                  </td>
                  <td class="px-6 py-4">
                  </td>
                  <td class="px-6 py-4">
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {{ cartStore.total }} RWF
                  </td>
                  <td @click="checkout" class="px-6 py-4 cursor-pointer bg-green-500 hover:bg-green-600 text-white text-center font-bold text-md">
                    <a href="#" >Checkout</a>
                    </td>
                    </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
      <div v-else class="flex justify-center items-center h-[calc(100vh-200px)]">
        <div class="text-center">
          <h1 class="text-2xl font-bold">Your cart is empty</h1>
          <p class="text-gray-500">Add items to your cart to checkout</p>
        </div>
      </div>

      
    </div>
  </UContainer>

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
const cancel = () => {
  cartStore.clearCart();
};
</script>
