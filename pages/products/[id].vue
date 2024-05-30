<template>
  <div>
    <div class="grid grid-cols-2 gap-[10vw]">
      <div class="p-7">
        <img
          src="/assets/mac.jpeg"
          alt="product img"
          class="mx-auto my-7 rounded-lg"
        />
      </div>
      <div class="p-7">
        <h2 class="font-bold text-primary text-3xl py-5">MACKBOOK PRO</h2>
        <p class="text-xl my-7 py-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam
          sunt illo ipsam consequatur error exercitationem perspiciatis minima
          nostrum autem ea?
        </p>
        <h3 class="font-bold border-b-2 mb-4 pb-2">
          Product Detaails:
          <span class="font-bold text-primary text-4xl pb-2"> 3000RWF</span>
        </h3>
        <UButton @click="cartStore.add()">ADD CART</UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore();
</script>

<style scoped>
img {
  max-width: 400px;
}
</style>
