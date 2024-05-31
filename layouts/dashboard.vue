<template>
  <div class="flex ">
<div class="fixed">
  <Sidebar/>
</div>
 
      <div class="absolute right-0 py-3 px-4">
  <Profile />
</div>

    
    <div class="w-full ml-72">
      <slot />
    </div>
  </div>
</template>

<script>
import DashNav from '~/components/DashNav.vue';
export default {
  layout: 'dashboard'
}
</script>

<style>

</style>
