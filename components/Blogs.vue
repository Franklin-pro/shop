<template>
  <div class="py-5">
    <div>
      <h1 class="text-xl p-5  text-primary">This Month</h1>
      <h2 class="text-4xl py-5  text-[#faa122]">Best Selling Products</h2>
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-8">
      <div v-for="item in blogs" :key="item._id">
     
          <div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
          <img class="h-48 w-full object-contain object-center" :src="item.blogsImage.url" alt="Product Image" />
          <div class="p-4">
            <h2 class="mb-2 text-lg font-medium truncate text-[#faa122]">{{ item.blogTitle }}</h2>
            <p class="mb-2 text-base dark:text-gray-300 text-gray-700 truncate">{{ item.blogsDescription}}</p>
            <div class="flex items-center justify-between">
              <NuxtLink :to="`/products/${item._id}`" class="text-md">Read More</NuxtLink>
              <UButton @click="addToCart(item._id)">
                BUY
              </UButton>
            </div>
          </div>
        </div>
  
      </div>
   

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';


interface Blogs {
  _id: string;
  blogTitle: string;
  blogsDescription: string;
  postedAt:Date
  blogsImage: {
    url: string;
  };
}

const blogsStore = useBlogsStore();
const cartStore = useCartStore();



const alertMessage = ref<string | null>(null);

const blogs = ref<Blogs[]>([]);
  const addToCart = (productId: string) => {
  cartStore.add(productId);
  alertMessage.value = 'Product added to cart!';
  setTimeout(() => {
    alertMessage.value = null;
  }, 3000);
};

onMounted(async () => {
  await blogsStore.fetchBlogs();
  blogs.value =blogsStore.blogs;
});


</script>


<style></style>
