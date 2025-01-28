<template>
  <div>
    <div class="min-h-screen bg-image flex flex-col justify-center items-center ">
    <div class="">
      <h1 class="text-5xl font-bold text-white text-center mb-4">
        Find Your<br>
        <span class="">Signature Style</span>
      </h1>
      <p class="text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <button class="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300">
        Explore Collection
      </button>
    </div>
  </div>

    <div>
  
     <div class="py-5">
      
<Carousel/>


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

.bg-image{
  background-image: url('../assets/heads.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: 1;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
    z-index: -1;
  }
 

}
</style>