<template>
  <div>
    <UContainer>
      <div class="grid lg:grid-cols-2 justify-between gap-5 ">
      <div class="lg:w-[50%] md:w-full py-2">
        <h1 class="font-bold pb-3 text-[#faa122]">ABOUT THIS CAMPANY</h1>
        <p class="font-light">
          "Kigali Phones Center Company was founded by franklin ndanyuzwe 
           is an East African Online shopping company based in
          Rwanda, which focuses on e-commerce of Electronics Devices."
        </p>
      </div>
      <div >
<div class="grid lg:grid-cols-2">
 <div>
  <h1 class="font-semibold px-3 text-[#faa122]">LATEST POSTS</h1>
  <div class="flex  flex-col justify-center p-2">
  <div v-for="item in data" :key="item.id">
    <div class="flex gap-5 items-center p-2 shadow-xl">
     
        <div >
      <img :src="item.image" alt="image" class="w-[100px] rounded-md">
    </div>
    <div class="px-3">
      <NuxtLink class="font-light hover:text-primary py-3" to="/">{{ item.head }}</NuxtLink>

      <div class="flex justify-between items-center">
        <p class="flex items-center gap-2 text-gray-400"> <UIcon :name="item.icon"/>{{ item.date }}</p>
        <UIcon :name="item.icons" class="font-light hover:text-primary py-3 cursor-pointer"/>
      </div>
      
    </div>
      </div>
     
  

    </div>
 </div>
 </div>

 

<div>
  <h1 class="text-[#faa122]">RECENT PRODUCT</h1>
  <div v-for="item in datax" :key="item.id">
    <div class="flex gap-5 items-center p-2">
     
        <div >
      <img src="../assets/mac.jpeg" alt="image" class="w-[100px] rounded-md">
    </div>
    <div>
      <NuxtLink class="font-light hover:text-primary py-3" to="/">{{ item.head }}</NuxtLink>
    
      <div class="flex justify-between items-center">
        <p class="flex items-center gap-2"> <UIcon :name="item.icon"/>{{ item.date }}</p>
        <UIcon :name="item.icons" class="font-light hover:text-primary py-3 cursor-pointer"/>
      </div>
      
    </div>
      </div>
     
  

    </div>
</div>
  
</div>
    </div>
    </div>
    </UContainer>

  </div>
</template>

<script setup>
const data = [
{
    id: 1,
    date: "15/9/2024",
    icon: "i-heroicons-calendar",
    image:'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/audio/g735-wireless-headset/gallery/g735-gallery-1.png?v=1',
    icons:"i-heroicons-chat-bubble-oval-left-16-solid",
    head: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores",
    
  },
  {
    id: 2,
    date: "15/9/2024",
    icon: "i-heroicons-calendar",
    image:'https://images.pexels.com/photos/5082555/pexels-photo-5082555.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
    icons:"i-heroicons-chat-bubble-oval-left-16-solid",
    head: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores",
    
  },
]
const datax = [
{
    id: 1,
    date: "15/9/2024",
    icon: "i-heroicons-calendar",
    icons:"i-heroicons-chat-bubble-oval-left-16-solid",
    head: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores",
    
  },
]

 
</script>

<style></style>
