import { defineStore } from 'pinia';
import { ref} from 'vue';
import axios from 'axios';
import type { Tracking } from '../type';

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const useTrackingStore = defineStore('track', () => {

  const tracking = ref<Tracking | null>(null);

  const setTracking = (data: Tracking | null) => {
    tracking.value = data;
    if (data) {
      localStorage.setItem('tracking', JSON.stringify(data));
    } else {
      localStorage.removeItem('tracking');
    }
  };

 
  const fetchTrackingProducts = async (product_id:string) => {
    try {
      const response = await axios.get(`http://localhost:3031/tracking/${product_id}`);
      setTracking(response.data);
    } catch (error) {
      console.error('Error fetching tracking products:', error);
    }
  };


  return {tracking,setTracking,fetchTrackingProducts };
});
