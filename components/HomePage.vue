<template>
  <div>
    <div class="grid lg:grid-cols-2 md:grid-cols gap-5 justify-between items-center p-3">
      <div>
<h2 class="font-light font-sans text-3xl">Kigali Phone Help Center</h2>
<h1 class="text-[50px] font-light font-sans text-primary"><span class="font-bold">SHOP</span> YOUR <span class="font-bold text-[#faa122]">GADGETS</span></h1>
<h4 class="text-3xl text-end font-sans">From <span >Kigali Rwanda Kicukiro</span></h4>
<h3 class="text-2xl py-7 text-semibold font-sans text-[#8e95a3]">Purchase Your Best Electronics Gadgets and Accessories With Us </h3>
      </div>
      <div class="image">
        <UCarousel
    :items="items"
    :ui="{
      item: 'basis-full',
      container: 'rounded-lg',
      indicators: {
        wrapper: 'relative bottom-0 mt-4'
      }
    }"
    indicators
    class="w-80 mx-auto"
  >
    <template #default="{ item }">
      <img :src="item" class="w-full" draggable="false">
    </template>

    <template #indicator="{ onClick, page, active }">
      <UButton :label="String(page)" :variant="active ? 'solid' : 'outline'" size="2xs" class="rounded-full min-w-6 justify-center" @click="onClick(page)" />
    </template>
  </UCarousel>
      </div>
    </div>
    <div class="flex justify-between bg-white">
      <div v-for="item in itex" :key="item.id">
        <div class="flex gap-5 p-5 items-center">
<UIcon :name="item.icon" class="text-[40px] text-black"/>
<div>
  <h2 class="text-2xl text-black">{{ item.heading }}</h2>
  <p class="font-light text-black">{{ item.description }}</p>
</div>
      </div>
      </div>

    </div>

    <div class="grid lg:grid-cols-2 md:grid-cols w-full p-5 gap-7">
<div v-for="item in datas" :key="item.id">
  <UCard class="relative">
    <div class="flex justify-between items-center">
    
      <div>
        <h2 class="absolute top-0 py-4 text-xl">{{ item.heading }}</h2>
  <p class="font-light text-2xl px-2">{{item.description}}</p>
      </div>
      <div>
<img :src="item.image" alt="image" class="w-[200px]">
      </div>

</div>

<UButton color="gray">SHOP NOW</UButton>
  </UCard>
</div>

    </div>

    <div>
      <div class="text-center leading-loose">
      <h1 class="text-xl py-3 text-primary">Trending Collection</h1>
      <h1 class="text-3xl text-[#faa122]">TOP SELLING ITEMS</h1>
      </div>
     <div class="py-5">
<Card/>
     </div>
    </div>

<div>
  <Discount/>
</div>

<div>
  <div class="heading">

  </div>
</div>
<Blogs/>
  </div>
</template>

<script lang="ts" setup>
const items = [
  'https://images.pexels.com/photos/5081386/pexels-photo-5081386.jpeg?auto=compress&cs=tinysrgb&w=800',

  'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6279110/pexels-photo-6279110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/5082555/pexels-photo-5082555.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
  'https://images.pexels.com/photos/1787235/pexels-photo-1787235.jpeg?auto=compress&cs=tinysrgb&w=800'
]

const datas = [
  {
    id:1,
    heading:"Best Deal",
    description:"Get 30% Off On Mackbook pro",
    image:"https://images.pexels.com/photos/894393/pexels-photo-894393.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id:2,
    heading:"Latest Brand",
    description:"Iphone 15 pro max New Brand",
    image:"https://images.pexels.com/photos/805922/pexels-photo-805922.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
]
const itex = [
{
    id:1,
    heading:"Free Shipping",
    description:"in order over 100$",
    icon:"i-heroicons-shopping-bag-solid"
  },
  {
    id:2,
    heading:"Return / Exchange",
    description:"Free Return Within 3Day",
    icon:"i-heroicons-arrow-uturn-left"
  },
  {
    id:3,
    heading:"Support 24/7",
    description:"Customer support",
    icon:"i-heroicons-phone"
  },
  // {
  //   id:4,
  //   heading:"Latest Brand",
  //   description:"Iphone 15 pro max New Brand",
  //   icon:"i-heroicons-phone"
  // },
]

const wew = [
{
    id:1,
    heading:"Best Deal",
    description:"Get 30% Off On Mackbook pro",
    image:"https://images.pexels.com/photos/894393/pexels-photo-894393.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id:2,
    heading:"Latest Brand",
    description:"Iphone 15 pro max New Brand",
    image:"https://images.pexels.com/photos/805922/pexels-photo-805922.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
]
</script>

<style>

</style>