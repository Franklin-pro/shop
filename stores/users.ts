import { defineStore } from 'pinia';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Create, Login, User,Tracking } from '../type';

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const router = useRouter();
  const tracking = ref<Tracking | null>(null);

  const setTracking = (data: Tracking | null) => {
    tracking.value = data;
    if (data) {
      localStorage.setItem('tracking', JSON.stringify(data));
    } else {
      localStorage.removeItem('tracking');
    }
  };

  const setToken = (data: string | null) => {
    token.value = data;
    if (data) {
      localStorage.setItem('token', data);
    } else {
      localStorage.removeItem('token');
    }
  };

  const setUser = (data: User | null) => {
    user.value = data;
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      localStorage.removeItem('user');
    }
  };

  onBeforeMount(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) {
      token.value = storedToken;
    }
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  });

  const createAccount = async (data: Create) => {
    try {
      const res = await $fetch<ApiResponse<User>>("https://e-commerce-20lb.onrender.com/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(res.message);
      setToken(res.data.token);
      setUser(res.data);
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  const signIn = async (data: Login) => {
    const validatePassword = (password: string) => password.length >= 8;

    if (!validatePassword(data.password)) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch("https://e-commerce-20lb.onrender.com/user/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.token) {
        setToken(result.token);
      } else {
        throw new Error('Token not found in response');
      }

      if (result.data && result.data.user) {
        setUser(result.data.user);
        alert('Login successful');

        if (result.data.user.role === 'admin') {
          await router.replace('/dashboard/dash');
        } else {
          await router.replace('/');
        }
        return result.data.user;
      } else {
        throw new Error('User data not found in response');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert('Invalid email or password. Please try again.');
      } else {
        setToken(null);
        setUser(null);

        console.error('Failed to sign in:', error);
        alert('An error occurred during login. Please try again later.');
        throw error;
      }
    }
  };

  const DeleteUser = async (userId : string) => {
try {
  const response = await axios.delete(`https://e-commerce-20lb.onrender.com/user/${userId}`)

} catch (error) {
  
}
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get<ApiResponse<User[]>>("https://e-commerce-20lb.onrender.com/user");

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchTrackingProducts = async () => {
    try {
      const response = await axios.get<ApiResponse<Tracking[]>>("http://localhost:3031/tracking");

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await router.push('/login'); // Assuming you have a login route
  };

  return { user, token,tracking,setTracking, logout, signIn,fetchTrackingProducts, setToken, setUser, fetchUser, createAccount,DeleteUser };
});
