<template>
  <section class="relative w-full min-h-screen bg-image dark:bg-gray-400">
    <div
      class="w-full mx-auto flex flex-col lg:flex-row items-center justify-center  min-h-screen m px-6 lg:px-12 py-12">
      <!-- Left Content -->
      <div class="text-center shadow-2xl dark:shadow-xl shadow-orange-700 dark:shadow-orange-700 lg:text-left lg:w-1/2  bg-white/40 backdrop-blur-lg rounded-xl p-3">
        <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Best Prices</span>
        <h1 class="mt-4 text-4xl dark:text-white md:text-5xl font-bold text-gray-900">
          Incredible Prices on All Your Favorite Items
        </h1>
        <p class="mt-3 text-gray-600 dark:text-gray-50 text-lg">
          Get more for less on selected brands
        </p>
        <a href="#"
          class="mt-6  inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-bold shadow-md hover:bg-blue-700 transition">
          Shop Now
        </a>
      </div>


      <!-- Right Image -->
      <div class="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
        <!-- <img src="../assets/head.png" alt="Smartwatch" class="w-full max-w-4xl rounded-lg " /> -->
      </div>
    </div>
  </section>
  <div>
    <Discount/>
    <Carousel />
  </div>
</template>

<script lang="ts" setup>
import Button from './Button.vue';
import Carousel from './Carousel.vue';


const datas = [
  {
    id: 1,
    heading: "Best Deal",
    description: "Get 30% Off On Mackbook pro",
    image: "https://images.pexels.com/photos/894393/pexels-photo-894393.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    heading: "Latest Brand",
    description: "Iphone 15 pro max New Brand",
    image: "https://images.pexels.com/photos/805922/pexels-photo-805922.jpeg?auto=compress&cs=tinysrgb&w=800"
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

.bg-image {
  background-image: url('https://static.wixstatic.com/media/c837a6_d84a631864a442a496670bc2d787c6a0~mv2.jpg/v1/fill/w_879,h_468,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_d84a631864a442a496670bc2d787c6a0~mv2.jpg');
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
    background-color: rgba(0, 0, 0, 0.5);
    /* Adjust the opacity as needed */
    z-index: -1;
  }


}

@media screen and (max-width: 1380px) {
  .bg-image {
    background-image: url('https://static.wixstatic.com/media/c22c23_e140bfa8cd6f4cb2ac5ee6e204f64073~mv2.jpg/v1/fill/w_879,h_468,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c22c23_e140bfa8cd6f4cb2ac5ee6e204f64073~mv2.jpg');
    background-attachment: scroll;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
} {
  
}
</style>