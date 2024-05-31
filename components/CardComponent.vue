<template>
  <div class="flex gap-4 px-5">
    <div v-for="item in items" :key="item.id">
      <UCard>
        <div class="flex items-center gap-3">
          <UIcon :name="item.icon" class="text-2xl font-semibold" dynamic/>
          <h1 class="font-light">{{ item.head }}</h1>
        </div>
        <div class="flex items-center gap-3 pt-4">
          <h1 class="font-semibold">{{ item.numbers }}</h1>
          <UIcon :name="item.icons" class="text-primary text-2xl font-semibold"/>
          <h2 class="text-primary font-semibold">{{ item.percentage }}</h2>
        </div>

 </UCard>
    </div>

  </div>
</template>

<script setup>
const items = [
{id:1,
  head:'Total Customer',
  numbers:"576,899",
  percentage:'2.5%',
  icon:'i-heroicons-user-group',
  icons:'i-heroicons-arrow-trending-up-16-solid'

},
{id:2,
  head:'Total Revenue',
  numbers:"$3,465 M",
  percentage:'0.5%',
  icon:'i-ic-baseline-attach-money',
  icons:'i-heroicons-arrow-trending-up-16-solid'

},
{id:3,
  head:'Total Order',
  numbers:"1,135 M",
  percentage:'2.5%',
  icon:'i-bi-bag-dash',
  icons:'i-heroicons-arrow-trending-down-20-solid'

},
{id:4,
  head:'Total Returns',
  numbers:"1,900",
  percentage:'0.12%',
  icon:'i-ic-baseline-attach-money',
  icons:'i-heroicons-arrow-trending-up-16-solid'

},
]
</script>

<style>

</style>