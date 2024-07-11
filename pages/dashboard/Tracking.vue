<template>
  <div class="min-h-screen p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Tracking</h1>
      <button class="bg-[#e8f7f1] opacity-2 text-[#5d8b78] px-4 py-2 rounded flex items-center gap-2">
        <UIcon name="i-heroicons-plus-circle-16-solid" /> Add new track
      </button>
    </div>
    
    <!-- Filters -->
    <div class="flex justify-between flex-col  mb-4">
      <div class="flex items-end space-x-4">
        <button 
          v-for="status in statuses" 
          :key="status"
          :class="getButtonClass(status)" 
          @click="setActiveButton(status)"
          class="px-4 py-2 rounded"
        >
          {{ status }} <span class="bg-[#e8f7f1] px-3 opacity-2 text-gray-500 rounded-md">{{ statusCounts[status] }}</span>
        </button>
      </div>
      <div class="flex justify-between gap-5 p-4 w-full items-center">
        <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search for track ID, customer, delivery status, destination"
        class="w-full"
      />

      <!-- <input type="text" placeholder= class="border-2 border-gray-400 px-4 py-2 rounded w-1/3"> -->
      <div class="flex space-x-4">
        <div v-for="item in menuItems" :key="item.id">
          <Dropdown :label="item.name" :items="item.submenus"/>
        </div>
       
      
      </div>
      </div>
   
    </div>

    <!-- Cards -->
    <div class="stats-cards gap-5">
      <div v-for="track in filteredTracks" :key="track.id">
        <UCard class="stat-card">
          <div>
            <div>
              <!-- Display order ID and status -->
              <span>{{ track.id }}</span>
              <span class="inline-block w-3 h-3 mr-2 rounded-full" :class="statusClass(track.status)"></span>
              <span>{{ track.status }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="w-full">
           
                <h1 class="text-lg font-bold">{{ track.route }}</h1>
                <h1 class="text-gray-600">{{ track.distance }} km</h1>
                <h1 class="text-gray-600">{{ track.timeLeft }}</h1>
              </div>
             
              <UCard class="w-full">
                <div class="flex flex-col justify-between rounded-md">
                  <div class="flex justify-between">
                 
                    <h1 class="text-sm text-gray-400">{{ track.route }}</h1>
                    <h1 class="text-sm text-gray-400">{{ track.timeLeft }}</h1>
                  </div>
                  <div class="flex justify-between items-center">
                    <!-- Placeholder for products and image -->
                    <div>
                      <p>{{ track.products }}</p>
                    </div>
                    <div class="w-[40%]">
                      <img src="../../assets/logo.png" alt="Company Logo">
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import products from '~/data';

const menuItems = ref([
  {
    id: 1,
    name: 'Filter',
    submenus: [
      {
        id: 3,
        label: 'Submenu 1'
      },
      {
        id: 4,
        label: 'Submenu 2'
      }
    ]
  },
  {
    id: 2,
    name: 'Time',
    submenus: [
      {
        id: 5,
        label: 'Submenu 3'
      },
      {
        id: 6,
        label: 'Submenu 4'
      }
    ]
  }
]);

const tracks = [
  {
    id: 'UL-158902NH',
    route: 'kicukiro - Niboye',
    distance: 529,
    timeLeft: '1h 26m',
    status: 'On route',
    products:"Iphone 15 pro"
  },
  {
    id: 'UK-568742NK',
    route: 'Nyarungenge - Nyamirambo',
    distance: 1959,
    timeLeft: '19h 9m',
    status: 'Waiting',
     products:"Macbook pro"
  },
  {
    id: 'KJ-145651LK',
    route: 'Gasabo- Kimihurura',
    distance: 1059,
    timeLeft: '12h 50m',
    status: 'On route',
     products:"Camera (sony lumix)"
  },
  {
    id: 'KJ-145651LK',
    route: 'Kicukiro- Gatenga',
    distance: 1059,
    timeLeft: '12h 50m',
    status: 'On route',
     products:"HeadPhone"
  },
 
];

definePageMeta({
  layout: 'dashboard'
});

const searchQuery = ref('');

const statusClass = (status) => {
  switch (status) {
    case 'On route':
      return 'bg-green-500';
    case 'Waiting':
      return 'bg-yellow-500';
    case 'Inactive':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const statuses = ['All', 'On route', 'Waiting', 'Inactive'];

const activeButton = ref('All');
const setActiveButton = (status) => {
  activeButton.value = status;
};

const getButtonClass = (status) => {
  return activeButton.value === status ? 'bg-[#19a873] text-white' : 'border-gray-400 border text-green-500';
};

const statusCounts = computed(() => {
  const counts = { 'All': tracks.length, 'On route': 0, 'Waiting': 0, 'Inactive': 0 };
  tracks.forEach(track => {
    if (track.status in counts) {
      counts[track.status]++;
    }
  });
  return counts;
});

const filteredTracks = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return tracks.filter(track => {
    const matchesSearch = track.id.toLowerCase().includes(query) ||
      track.route.toLowerCase().includes(query) ||
      track.status.toLowerCase().includes(query);
    const matchesStatus = activeButton.value === 'All' || track.status === activeButton.value;
    return matchesSearch && matchesStatus;
  });
});
</script>

<style scoped>
.green-dots p {
  position: relative;
  padding-left: 1.5em;
}

.green-dots p::before {
  content: '•';
  color: green; 
  position: absolute;
  left: 0;
  font-size: 30px;
}
.stat-card {
  padding: 1rem;
  border-radius: 0.5rem;
}
.stats-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
