<template>
  <div :theme="useCartStore().getTheme">
    <NuxtLoadingIndicator/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  </div>
</template>
