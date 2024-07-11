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
      user.value = userResponse.data.data; 
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

const dropdownItems = ref([
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    path: '/settings'
  },
  {
    label: 'Documentation',
    icon: 'i-heroicons-book-open'
  },
  {
    label: 'Changelog',
    icon: 'i-heroicons-megaphone'
  },
  {
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle'
  }
]);

</script>
<template>
  <UDropdown :items="dropdownItems" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

    <template #trigger>
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">{{ user.email }}</p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>




<style>

</style>