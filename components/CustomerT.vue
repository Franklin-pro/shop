<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'


// Define the structure of a column
interface Column {
  key: string
  label: string
  sortable: boolean
}

// Define the structure of a row
interface User {
  id: string
  userid: string
  email: string
  role: string
  signedAt: string
}

// Columns definition for user data
const columns: Column[] = [
  { key: 'userid', label: 'User ID', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'signedAt', label: 'Signed At', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
]

const selectedColumns = ref<Column[]>(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref<User[]>([])

// Actions
const actions = [
  [{ key: 'completed', label: 'Completed', icon: 'i-heroicons-check' }],
  [{ key: 'uncompleted', label: 'In Progress', icon: 'i-heroicons-arrow-path' }]
]

// Status options for the select menu
const todoStatus = [
  { label: 'Completed', value: 'completed' },
  { label: 'In Progress', value: 'in-progress' }
]

const search = ref('')
const selectedStatus = ref<{ value: string }[]>([])
const searchStatus = computed(() => {
  if (selectedStatus.value.length === 0) {
    return ''
  }

  return selectedStatus.value.map(status => `?completed=${status.value}`).join('&')
})

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = []
}

const sort = ref({ column: 'userid', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)

// Data fetching for user data
const people = ref<User[]>([])
const pending = ref(false)

const fetchUsers = async () => {
  pending.value = true
  try {
    const response = await axios.get('https://e-commerce-20lb.onrender.com/user', {
      params: {
        q: search.value,
        _page: page.value,
        _sort: sort.value.column,
        _order: sort.value.direction
      }
    })
    people.value = response.data.data
    
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    pending.value = false
  }
}

// Call fetchUsers whenever the relevant states change
watch([page, search, searchStatus, pageCount, sort], fetchUsers)
onMounted(fetchUsers)

const showModal = ref(false)
const selectedOrder = ref<Record<string, any>>({})

const openModal = (order: Record<string, any>) => {
  selectedOrder.value = order
  showModal.value = true
}

const select = (rows: User[]) => {
  selectedRows.value = rows
}

const deleteUser = async (userId: string) => {
  try {
    await axios.delete(`https://e-commerce-20lb.onrender.com/user/${userId}`)
    fetchUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
    }"
  >
    <template #header>
      <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
        Users
      </h2>
    </template>


    
    <UTable
      v-model="selectedRows"
      v-model:sort="sort"
      :rows="people"
      :columns="columnsTable"
      :loading="pending"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
      sort-mode="manual"
      class="w-full"
      :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'gray' } } }"
      @select="select"
    >
      <template #actions-data="{ row }">
        <UButton
          icon="i-heroicons-trash"
          size="2xs"
          color="red"
          variant="outline"
          :ui="{ rounded: 'rounded-full' }"
          square
          @click="deleteUser(row._id)"
        />
      </template>
    </UTable>

  </UCard>

  <!-- Include the OrderModal component if needed -->
  <!-- <OrderModal :showModal.sync="showModal" :order="selectedOrder" /> -->
</template>

<style scoped>
/* Add your styles here */
</style>
