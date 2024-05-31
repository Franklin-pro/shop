<template>
  <div class="p-2 w-full flex justify-center w-full md-">

    <!-- <div class=" bg-green-500 lg:w-[50%] md:hidden sm:hidden">
      <img src="../assets/sad.jpeg" alt="Image">
    </div> -->
    <div class="lg:w-[50%] md:w-full rounded-x p-4">
    
<UCard>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup name="email">
          <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="Enter email" />
        </UFormGroup>

        <UFormGroup name="password">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="Enter password"
            icon="i-heroicons-lock-closed-16-solid"
          />
        </UFormGroup>

        <Button>Login</Button>
      </UForm>
      <NuxtLink to="/forgotpassword" class="flex justify-end pr-4 text-blue-500">Forgot Password?</NuxtLink>
      <div class="p-4"></div>
      <p class=" text-center">
        If you don't have an account here? <NuxtLink to="/createaccount" class="text-blue-500 hover:text-blue-300">Sign-Up</NuxtLink>
      </p>
</UCard>
      

   
    </div>

  </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import type { FormError } from '#ui/types'
import Button from '~/components/Button.vue';

const userStore = useUserStore()
const router = useRouter()

const state = reactive({
  email: '',
  password: ''
})

const validate = (state: any): FormError[] => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

const signIn = async () => {
  try {
    const user = await userStore.signIn({
      email: state.email,
      password: state.password
    })
    
 
  } catch (error) {
    console.error('Failed to sign in:', error)
  }
}

const onSubmit = async (event: any) => {
  const errors = validate(state)
  if (errors.length > 0) {
    console.log('Form validation errors:', errors)
    return
  }
  await signIn()
}
</script>




<style scoped>
/* .width {
  backdrop-filter: blur(50px);
  margin: 0 auto;
  width: 80%;

  border-radius: 20px;
  padding: 50px;
  height: 600px;
} */
img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
</style>

