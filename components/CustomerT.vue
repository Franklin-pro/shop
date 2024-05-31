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
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

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
    pageTotal.value = response.data.total // Assuming the API returns total count
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

    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

      <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" />
    </div>

    <div class="flex justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">Rows per page:</span>

        <USelect
          v-model="pageCount"
          :options="[1, 3, 5, 10, 20, 30, 40]"
          class="me-2 w-20"
          size="xs"
        />
      </div>

      <div class="flex gap-1.5 items-center">
        <UDropdown v-if="selectedRows.length > 1" :items="actions" :ui="{ width: 'w-36' }">
          <UButton
            icon="i-heroicons-chevron-down"
            trailing
            color="gray"
            size="xs"
          >
            Mark as
          </UButton>
        </UDropdown>

        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton
            icon="i-heroicons-view-columns"
            color="gray"
            size="xs"
          >
            Columns
          </UButton>
        </USelectMenu>

        <UButton
          icon="i-heroicons-funnel"
          color="gray"
          size="xs"
          :disabled="search === '' && selectedStatus.length === 0"
          @click="resetFilters"
        >
          Reset
        </UButton>
      </div>
    </div>

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
          @click="deleteUser(row.id)"
        />
      </template>
    </UTable>

    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
        <div>
          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ pageFrom }}</span>
            to
            <span class="font-medium">{{ pageTo }}</span>
            of
            <span class="font-medium">{{ pageTotal }}</span>
            results
          </span>
        </div>

        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="pageTotal"
          :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline'
              }
            }
          }"
        />
      </div>
    </template>
  </UCard>

  <!-- Include the OrderModal component if needed -->
  <!-- <OrderModal :showModal.sync="showModal" :order="selectedOrder" /> -->
</template>

<style scoped>
/* Add your styles here */
</style>
