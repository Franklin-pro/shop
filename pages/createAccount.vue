<template>
  <div class=" p-2 w-full flex justify-center">
    <!-- <div class=" bg-green-500 lg:w-[50%]">
<img src="../assets/mac.jpeg" alt="">
</div> -->
      <div class="lg:w-[50%] md:w-full p-4">
         
    <UCard>
      <h1 class="font-bold p-3 text-3xl text-center text-green-500">Create Account</h1>
      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit" >
              <UFormGroup name="fullName">
    <UInput v-model="state.fullName" icon="i-heroicons-user-16-solid" placeholder="enter FullName" size="lg"/>
  </UFormGroup>
  <UFormGroup name="email">
    <UInput v-model="state.email"  icon="i-heroicons-envelope" placeholder="enter email address" size="lg"/>
  </UFormGroup>
  <UFormGroup name="phoneNumber">
    <UInput v-model="state.phoneNumber"  icon="i-heroicons-phone-solid" placeholder="enter Phone Number" size="lg"/>
  </UFormGroup>
  <UFormGroup name="houseNumber">
    <UInput v-model="state.houseNumber"  icon="i-heroicons-home" placeholder="enter House Number" size="lg"/>
  </UFormGroup>
  <UFormGroup name="streetNumber">
    <UInput v-model="state.streetNumber" placeholder="enter Street Number" size="lg"/>
  </UFormGroup>
  <UFormGroup name="city">
    <UInput v-model="state.city"  icon="i-heroicons-globe-europe-africa" placeholder="enter city" size="lg"/>
  </UFormGroup>
  <UFormGroup name="address">
    <UInput v-model="state.address"  icon="i-heroicons-map-pin-16-solid" placeholder="enter address ex:kicukiro,gatenga" size="lg"/>
  </UFormGroup>
  <UFormGroup  name="password">
    <UInput v-model="state.password" type="password" placeholder="enter password" icon="i-heroicons-lock-closed-16-solid" size="lg" />
  </UFormGroup>

  <button class="bg-orange-500 w-72 py-2 rounded-md text-lg font-bold">Create Account</button>
</UForm>





<p class=" text-center">if you have account here? <NuxtLink to="/login" class="text-blue-500 hover:text-blue-300">Sign-In</NuxtLink></p>
    </UCard>

</div>


  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const userStore = useUserStore()



import type { FormError, FormSubmitEvent } from '#ui/types'
import Button from '~/components/Button.vue';

const state = reactive({
  fullName:'',
  phoneNumber:'',
  houseNumber:'',
  streetNumber:'',
  city:'',
  address:'',
email: '',
password: '',

})

const createAccounts =async() => {
  try {
  await userStore.createAccount({
    fullName:state.fullName,
    phoneNumber : state.phoneNumber,
    houseNumber:state.houseNumber,
    streetNumber : state.streetNumber,
    city:state.city,
    address:state.address,
    email: state.email,
    password: state.password,
  })
 
} catch (error) {
  console.error('fail to create account', error)
}
}

const onSubmit = async (event :FormSubmitEvent<any>) =>{
  const errors = validate(state)
  if(errors.length > 0){
    console.log('form validation error', errors)
  }
  await createAccounts()
}

const validate = (state: any): FormError[] => {
const errors = []
if(!state.fullName) errors.push({path: 'fullName', message:'Required'})
if (!state.email) errors.push({ path: 'email', message: 'Required' })
if (!state.phoneNumber) errors.push({ path: 'phoneNumber', message: 'Required' })
if (!state.houseNumber) errors.push({ path: 'houseNumber', message: 'Required' })
if (!state.streetNumber) errors.push({ path: 'streetNumber', message: 'Required' })
if (!state.city) errors.push({ path: 'city', message: 'Required' })
if (!state.address) errors.push({ path: 'address', message: 'Required' })
if (!state.password) errors.push({ path: 'password', message: 'Required' })
return errors
}


</script>

<style scoped>
.width{
  backdrop-filter: blur(50px);
  margin: 50px auto;
  width: 100%;
  border-radius: 20px;
  padding: 50px;
  /* height: 600px; */
 
}
img{
  width: 100%;
  object-fit: cover;

  height: 100%;
}

</style>