<template>
  <div class="py-5">
    <div>
      <h1 class="text-xl p-5 text-center text-primary">OUR BLOGS</h1>
      <h2 class="text-4xl py-5 text-center text-[#faa122]">OUR LATEST NEWS</h2>
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-8">
      <div v-for="item in items" :key="item.id">
        <UCard class="lg:w-[400px] md:w-full p-0">
        <template #header>
          <div>
            <img src="../assets/mac.jpeg" alt="" class="w-full h-[300px]" />
          </div>
        </template>
        <div>
          <p class="font-light text-gray-500 flex items-center gap-3">
            <UIcon :name="item.icon" />{{ item.date }}
          </p>
          <h1 class="text-2xl font-bold py-2 text-[#faa122]">{{ item.head }}</h1>
          <p class="font-light">
          {{ item.description }}
          </p>
        </div>
      </UCard>
      </div>
   

    </div>
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    id: 1,
    date: "20/5/2024",
    icon: "i-heroicons-calendar",
    head: "BLOGS TITLE 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,numquam maiores facere deserunt itaque quibusdam quidem iure illo praesentium molestiae.",
  },
  {
    id: 2,
    date: "15/9/2024",
    icon: "i-heroicons-calendar",
    head: "BLOGS TITLE 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,numquam maiores facere deserunt itaque quibusdam quidem iure illo praesentium molestiae.",
  },
  {
    id: 3,
    date: "21/7/2024",
    icon: "i-heroicons-calendar",
    head: "BLOGS TITLE 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,numquam maiores facere deserunt itaque quibusdam quidem iure illo praesentium molestiae.",
  },
];
</script>

<style></style>
