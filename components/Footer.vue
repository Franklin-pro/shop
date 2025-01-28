<template>
  <footer class="dark:bg-gray-900 bg-gray-100  py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column: Address and Contact -->
        <div>
          <h2 class="text-2xl font-bold mb-4">NIndove</h2>
          <p class="text-gray-600 dark:text-gray-50">549 Oak St. Crystal Lake, IL 60014</p>
          <p class="text-gray-600 dark:text-gray-50 mt-2">GET DIRECTION 71</p>
          <p class="text-gray-600 dark:text-gray-50 mt-2">
            <a href="mailto:theme:flat@gmail.com" class="hover:text-blue-500">theme:franklinprogrammer@gmail.com</a>
          </p>
          <p class="text-gray-600 dark:text-gray-50 mt-2">📝 +250783446449</p>
          <p class="text-gray-600 dark:text-gray-50 mt-2"><UIcon name="i-heroicons-phone"/> +250790019543</p>
        </div>

        <!-- Middle Column: Information and Customer Services -->
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Information</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">About Us</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Our Stories</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Site Guide</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Contact Us</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Career</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">My Account</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Customer Services</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Shipping</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Return & Refund</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Terms & Conditions</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">Orders FAQs</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-50 hover:text-blue-500">My Website</a></li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
          <p class="text-gray-600 dark:text-gray-50 mb-4">
            Sign up for our newsletter and get <span class="text-blue-500">10% off</span> your first purchase.
          </p>
          <form @submit.prevent="subscribe" class="flex items-center">
            <input
              type="email"
              v-model="email"
              placeholder="Enter your e-mail"
              class="bg-gray-800 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              class="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p class="text-gray-600 dark:text-gray-50 text-sm mt-2">
            By clicking subscribe, you agree to the <a href="#" class="text-blue-500">Terms of Service</a> and
            <a href="#" class="text-blue-500">Privacy Policy</a>.
          </p>
        </div>
      </div>

      <!-- Bottom Section: Copyright and Payment Icons -->
      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <h2>&copy; {{ new Date().getFullYear() }} Powered by Franklin'S TECHNOLOGY</h2>
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
          <span class="text-gray-400 text-sm">UID</span>
          <span class="text-gray-400 text-sm">English</span>
          <div class="flex space-x-2">
            <UIcon name="i-mdi-twitter" dynamic class="text-3xl rounded-[50%] hover:bg-gray-200 hover:text-black duration-300"/>
    <UIcon name="i-mdi-instagram" dynamic class="text-3xl p-1 rounded-[50%] hover:bg-gray-200 hover:text-black duration-300"/>
    <UIcon name="i-mdi-facebook" dynamic class="text-3xl p-1 rounded-[50%] hover:bg-gray-200 hover:text-black duration-300"/>
    <UIcon name="i-mdi-linkedin" dynamic class="text-3xl p-1 rounded-[50%] hover:bg-gray-200 hover:text-black duration-300"/>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">


const email = ref('');

const subscribe = () => {
  // Handle newsletter subscription
  alert(`Subscribed with email: ${email.value}`);
  email.value = '';
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>