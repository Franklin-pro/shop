<template>
  <div>
    <UContainer>

      <div class="grid lg:grid-cols-2 justify-between gap-5 ">
     
      <div class="lg:w-full md:w-full py-2">
        <h1 class="font-bold pb-3 text-[#faa122]">ABOUT THIS CAMPANY</h1>
        <p class="font-light">
          "Franklin Shop Electronics Company was founded by franklin ndanyuzwe 
           is an East African Online shopping company based in
          Rwanda, which focuses on e-commerce of Electronics Devices."
        </p>
      </div>
      <div>
<div class="grid lg:grid-cols-3">

  <div>
    <div class="w-[50px] ">
      <img src="../assets/logo.png" alt="" class="w-full">
    </div>
 
      <h1 class="font-sans py-3  font-bold">Free Delivery</h1>
      <p class="font-sans">for All Order Over 100$</p>
    </div>
    <div>
      <div class="w-[50px]">
        <img src="../assets/com-removebg-preview.png" alt="" class="w-full">
      </div>
     
      <h1 class="font-sans py-3 font-bold">24/7 Customer Service</h1>
      <p class="font-sans">Friendly 24/7 customer support</p>
    </div>
    <div>
      <div class="w-[50px]">
        <img src="../assets/hy-removebg-preview.png" alt="" class="w-full">
      </div>
      
      <h1 class="font-sans py-3  font-bold">Money Back Guarante</h1>
      <p class="font-sans">We return within 30days</p>
    </div>
</div>
    </div>
  
    </div>
    </UContainer>

  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface ProductImage {
  url: string;
}

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productImage: ProductImage;
  productPrice: number;
}

const productsStore = useProductsStore();
const cartStore = useCartStore();

const products = ref<Product[]>([]);

onMounted(async () => {
  await productsStore.fetchProducts();
  products.value = productsStore.products;
});

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
