<template>
  <div class="p-7">
    <div class="flex justify-between flex-col p-5 mb-4">
     
   <OrderT/>
    </div>
   
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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
    route: 'Madrid - Malaga',
    distance: 529,
    timeLeft: '1h 26m',
    status: 'On route',
  },
  {
    id: 'UK-568742NK',
    route: 'Madrid - Roma',
    distance: 1959,
    timeLeft: '19h 9m',
    status: 'Waiting',
  },
  {
    id: 'KJ-145651LK',
    route: 'Paris - Berlin',
    distance: 1059,
    timeLeft: '12h 50m',
    status: 'On route',
  },
  {
    id: 'KJ-145651LK',
    route: 'Paris - Berlin',
    distance: 1059,
    timeLeft: '12h 50m',
    status: 'On route',
  },
 
];

definePageMeta({
  layout:'dashboard',
  middleware:'auth'
})

const searchQuery = ref('');

const statusClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500';
    case 'Progress':
      return 'bg-yellow-500';
    case 'Cancelled':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const statuses = ['All', 'Completed', 'In Progress', 'Canceled'];

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

<style>

</style>