<template>
  <div>
    <div class=" bg-image">
   <div class="lg:h-[600px] p-[20px] lg:flex justify-between items-center relative lg:flex-row-reverse md:flex-col sm:flex-col gap-[40px]">
   
      <img src="../assets/head.png" alt="" class="lg:w-[100%] lg:h-[500px] ">
     

    <div class="w-full ">
      <h1 class="text-[50px] mb-8 text-[#faa122] font-semibold w-full">Your Perfect electronic device</h1>
      <p class="text-xl font-sans mb-8 text-left">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non debitis ullam commodi vero suscipit ratione!</p>
    <Button @click="$router.push('/products')">
      Get Started
    </Button>
    </div>
   </div>

    </div>
    <!-- <div class="flex justify-between bg-white">
      <div v-for="item in itex" :key="item.id">
        <div class="flex gap-5 p-5 items-center">
<UIcon :name="item.icon" class="text-[40px] text-black"/>
<div>
  <h2 class="text-2xl text-black">{{ item.heading }}</h2>
  <p class="font-light text-black">{{ item.description }}</p>
</div>
      </div>
      </div>

    </div> -->

    <div class="grid lg:grid-cols-2 md:grid-cols w-full p-5 gap-7">
<!-- <div v-for="item in datas" :key="item.id">
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

<Button>
  SHOP NOW
</Button>
  </UCard>
</div> -->

    </div>

    <div>
      <div class="px-7 leading-loose">
      <h1 class="text-xl py-3 text-primary">Our Products</h1>
      <h1 class="text-3xl text-[#faa122]">Explore Our Products</h1>
      </div>
     <div class="py-5">
      
<Carousel/>
<div class="flex justify-center">
  <Button @click="$router.push('/products')"> View All Products</Button>
</div>

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
import Button from './Button.vue';
import Carousel from './Carousel.vue';


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

</script>

<style>
/* .bg-image{
  background-image: url('https://images.pexels.com/photos/450055/pexels-photo-450055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
} */
</style>