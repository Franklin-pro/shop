<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import Button from './Button.vue';

// Define the structure of a column
interface Column {
  key: string
  label: string
  sortable: boolean
}

// Define the structure of a product
interface Product {
  _id: string
  productImage: {
    public_id: string
    url: string
  }
  productName: string
  productDescription: string
  productPrice: string
  postedAt: string
}

// Columns definition for products
const columns: Column[] = [
  { key: 'productImage', label: 'Image', sortable: false },
  { key: 'productName', label: 'Product Name', sortable: true },
  { key: 'productDescription', label: 'Description', sortable: false },
  { key: 'productPrice', label: 'Price', sortable: true },
  { key: 'postedAt', label: 'Posted At', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
]

const selectedColumns = ref<Column[]>(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref<Product[]>([])

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

const sort = ref({ column: 'productName', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

// Data fetching for product data
const products = ref<Product[]>([])
const pending = ref(false)

const fetchProduct = async () => {
  pending.value = true
  try {
    const response = await axios.get('https://e-commerce-20lb.onrender.com/product', {
      params: {
        q: search.value,
        _page: page.value,
        _limit: pageCount.value,
        _sort: sort.value.column,
        _order: sort.value.direction
      }
    })
    products.value = response.data.data
    pageTotal.value = response.data.total // Assuming the API returns total count
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    pending.value = false
  }
}

// Call fetchProduct whenever the relevant states change
watch([page, search, searchStatus, pageCount, sort], fetchProduct)
onMounted(fetchProduct)

const showModal = ref(false)
const selectedOrder = ref<Record<string, any>>({})

const openModal = (order: Record<string, any>) => {
  selectedOrder.value = order
  showModal.value = true
}

const select = (rows: Product[]) => {
  selectedRows.value = rows
}

const showDeleteConfirmModal = ref(false)
const productIdToDelete = ref<string | null>(null)

const openDeleteConfirmModal = (productId: string) => {
  productIdToDelete.value = productId
  showDeleteConfirmModal.value = true
}

const confirmDeleteProduct = async () => {
  if (!productIdToDelete.value) return

  try {
    await axios.delete(`https://e-commerce-20lb.onrender.com/product/${productIdToDelete.value}`)
    await fetchProduct() // Fetch the product list again to refresh the data
  } catch (error) {
    console.error('Error deleting product:', error)
  } finally {
    showDeleteConfirmModal.value = false
    productIdToDelete.value = null
  }
}

// Form data for updating product
const updateForm = ref({
  _id: '',
  productName: '',
  productDescription: '',
  productPrice: '',
  productImage: {
    public_id: '',
    url: ''
  }
})

const showUpdateModal = ref(false)

const openUpdateModal = (product: Product) => {
  updateForm.value = { ...product }
  showUpdateModal.value = true
}

const updateProduct = async () => {
  try {
    const { _id, ...updatedData } = updateForm.value
    await axios.put(`https://e-commerce-20lb.onrender.com/product/${_id}`, updatedData)
    await fetchProduct() // Fetch the product list again to refresh the data
    showUpdateModal.value = false
  } catch (error) {
    console.error('Error updating product:', error)
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
      <h2 class="font-semibold text-4xl text-gray-900 dark:text-white leading-tight">
        All Products
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
      :rows="products"
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
        <div class=" flex justify-between p-1">
          <UButton
          icon="i-heroicons-trash"
          size="2xs"
          color="red"
          variant="outline"
          :ui="{ rounded: 'rounded-full' }"
          square
          @click="openDeleteConfirmModal(row._id)"
        />
        <UButton
          icon="i-heroicons-pencil"
          size="2xs"
          color="blue"
          variant="outline"
          :ui="{ rounded: 'rounded-full' }"
          square
          @click="openUpdateModal(row)"
        />
        </div>
     
      </template>
      <template #productImage-data="{ row }">
        <img :src="row.productImage.url" alt="Product Image" class="h-10 w-10 object-cover"/>
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
          :page-count="Math.ceil(pageTotal / pageCount)"
          :total="pageTotal"
          :ui="{
            button: { base: 'rounded-md' },
            previous: { icon: 'i-heroicons-chevron-left' },
            next: { icon: 'i-heroicons-chevron-right' }
          }"
          size="sm"
          class="flex items-center gap-2"
        />
      </div>
    </template>
  </UCard>

  
  <UModal v-model="showUpdateModal" title="Update Product">
    <div class="space-y-4">
      <UCard>
        <UInput v-model="updateForm.productName" label="Product Name" class="p-2"/>
      <UInput v-model="updateForm.productDescription" label="Product Description" class="p-2"/>
      <UInput v-model="updateForm.productPrice" label="Product Price" type="number" class="p-2" />
      <div class="flex justify-end space-x-2">
        <UButton color="blue" icon="i-heroicons-x-mark-16-solid" @click="showUpdateModal = false">Cancel</UButton>
        <UButton icon="i-heroicons-pencil-20-solid" @click="updateProduct">Update</UButton>
      </div>
      </UCard>
   
    </div>

  </UModal>
  <UModal v-model="showDeleteConfirmModal" title="Confirm Delete">
    <UCard>
      <p class="text-center">Are you sure you want to delete this product?</p>
    <div class="flex justify-center mt-4 gap-5">
      <UButton color="blue" icon="i-heroicons-x-mark-16-solid" @click="showDeleteConfirmModal = false">Cancel</UButton>
      <UButton icon="i-heroicons-trash" color="red" @click="confirmDeleteProduct">Delete</UButton>
    </div>
    </UCard>
   
  </UModal>
</template>
