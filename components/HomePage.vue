<template>
  <div>
    <div class=" bg-image">
   <div class="lg:h-[600px] p-[20px] image-container lg:flex justify-between items-center relative lg:flex-row-reverse md:flex-col sm:flex-col gap-[40px]">
   
      <img src="../assets/head.png" alt="" class="lg:w-[100%] lg:h-[500px] ">
     

    <div class="w-full ">
      <h1 class="lg:text-5xl md:text-2xl sm:text-xl mb-5 text-[#faa122] font-semibold w-full"> Franklin'$hop  €lectronics</h1>
      <p class="text-md mb-8 text-left space-y-1">Welcome to Franklin'shop Electronics, your premier destination for cutting-edge technology and innovation. Explore our curated selection of electronic devices designed to elevate your lifestyle</p>
    <Button @click="$router.push('/products')">
      Get Started
    </Button>
    </div>
   </div>

    </div>

    <div class="grid lg:grid-cols-2 md:grid-cols w-full p-5 gap-7">


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

.image-container {
  perspective: 1000px;
}

img {
  width: 100%;
  transform: rotateY(20deg);
  transition: transform 0.5s;
}

img:hover {
  transform: rotateY(0deg);
}
</style>