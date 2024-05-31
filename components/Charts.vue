<template>
  <div class="dashboard">
    <div class="stats-cards">
      <div class="stat-card" v-for="(card, index) in statCards" :key="card.id">
        <UCard>
          <div class="flex justify-between">
          <h3>{{ card.value }}</h3>
          
          <UTooltip text="delete this card"  :popper="{ arrow: true }">
            <UIcon name="i-heroicons-trash" @click="deleteCard(card.id)" class="cursor-pointer hover:bg-red-500"/>
  </UTooltip>
          </div>
      
          <div class="flex ">
            <UIcon :name="card.icon" class="card-icon" />
            <p class="font-bold mr-4">{{ card.title }}</p>
            <p :class="{'text-green': card.change > 0, 'text-red': card.change < 0}">
              <UIcon :class="{'i-heroicons-arrow-trending-up-16-solid': card.change > 0, 'i-heroicons-arrow-trending-down-16-solid': card.change < 0}" />
              {{ card.change }}%
            </p>
          </div>
         
        </UCard>
      </div>
    </div>
    <div>
      <div class="w-[20%] text-center"> 
        <UTooltip text="add new card"  :popper="{ arrow: true }">
          <UCard @click="isOpen = true" class="border-dashed border-2 cursor-pointer border-gray-400">
          <UIcon name="i-heroicons-plus-circle-16-solid" />
          <h1>ADD Data</h1>
        </UCard>
  </UTooltip>
     
      </div>

      <UModal v-model="isOpen">
        <div class="p-3">
          <UInput v-model="newCard.id" placeholder="Card id" class="py-2" />
        <UInput v-model="newCard.value" placeholder="Card Title" class="py-2" />
        <UInput v-model="newCard.title" placeholder="Card Value" class="py-2" />
        <UInput v-model="newCard.change" placeholder="Change %" type="number" class="py-2" />
        <Button @click="addCard">ADD CARD</Button>
       
        </div>
    
      </UModal>
    </div>
    
    <div class="chartS">
      <h2>Product Sale</h2>
      <BarChart />
      <div class="flex gap-5 justify-between">
        <div class="py-5 w-[40%] flex">
          <UCard>
            <PieChart />
          </UCard>
        </div>
        <div class="py-5 w-[50%] flex">
          <UCard>
            <div class="flex">
              <div class="w-[50%]">
                <h3>Sales by Countries</h3>
                <ul class="flex-col">
                  <li v-for="country in salesByCountry" :key="country.name">
                    {{ country.name }} - {{ country.percentage }}%
                  </li>
                </ul>
              </div>
              <div class="w-[70%]">
                <img src="https://www.clearias.com/up/Countries-of-the-World-Listed-By-Continent.png" alt="World Map">
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import BarChart from '../components/BarCharts.vue'
import PieChart from '../components/PieChart.vue'

const statCards = ref([])

const loadCardsFromLocalStorage = () => {
  const savedCards = localStorage.getItem('statCards')
  if (savedCards) {
    statCards.value = JSON.parse(savedCards)
  } else {
    statCards.value = [
      { id: 1, title: 'Total Customers', value: '567,899', change: 2.5, icon: 'i-heroicons-users-16-solid' },
      { id: 2, title: 'Total Revenue', value: '$3,465 M', change: 0.5, icon: 'i-heroicons-currency-dollar-16-solid' },
      { id: 3, title: 'Total Orders', value: '1,136 M', change: -0.2, icon: 'i-heroicons-shopping-cart-16-solid' },
      { id: 4, title: 'Total Returns', value: '1,789', change: 0.12, icon: 'i-heroicons-refresh-16-solid' }
    ]
  }
}

const saveCardsToLocalStorage = () => {
  localStorage.setItem('statCards', JSON.stringify(statCards.value))
}

const newCard = ref({ title: '', value: '', change: 0, id: '' })

const addCard = () => {
  if (newCard.value.title && newCard.value.value) {
    const newId = statCards.value.length ? statCards.value[statCards.value.length - 1].id + 1 : 1
    statCards.value.push({ id: newId, ...newCard.value })
    newCard.value = { title: '', value: '', change: 0, icon: '' }
    saveCardsToLocalStorage()
    isOpen.value = false
  }
}

const deleteCard = (id) => {
  const index = statCards.value.findIndex(card => card.id === id)
  if (index !== -1) {
  alert('are you sure')
    statCards.value.splice(index, 1)
    saveCardsToLocalStorage()
  }
}

onMounted(() => {
  loadCardsFromLocalStorage()
})

const salesByCountry = ref([
  { name: 'Poland', percentage: 19 },
  { name: 'Austria', percentage: 15 },
  { name: 'Spain', percentage: 13 },
  { name: 'Romania', percentage: 12 },
  { name: 'France', percentage: 11 },
  { name: 'Italy', percentage: 11 },
  { name: 'Germany', percentage: 10 },
  { name: 'Ukraine', percentage: 9 }
])

const isOpen = ref(false)
</script>


<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.stats-cards{
  display: grid;
 grid-template-columns: repeat(4,1fr);
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.stat-card {
  padding: 1rem;
  border-radius: 0.5rem;
  flex: 1;
  text-align: center;
}

.text-green {
  color: green;
}

.text-red {
  color: red;
}

.chartS {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-icon {
  font-size: 2rem;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.pie-chart,
.sales-by-country {
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
}
</style>

