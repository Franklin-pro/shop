<template>
  <div class="forgot h-[50vh]">
    <div class="flex flex-col justify-center text-center i change">
      <div>
        <h1 class="font-bold p-3 text-2xl">Forgot Password</h1>
        <p class="p-2">Enter your email and we'll send you a link to reset your password</p>
      </div>
      <div class="flex flex-col justify-cent">
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup name="email">
            <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="Enter email address"/>
          </UFormGroup>
          <button type="submit" class=" bg-[#68ae34] px-4 py-2 rounded-md hover:border hover:bg-[#662d91] w-full flex items-center text-xl justify-center" color="primary" variant="solid">Send</button>
        </UForm>
        <NuxtLink to="/login" class="flex items-center hover:text-primary">
          <UIcon name="i-heroicons-chevron-left-16-solid" class="text-3xl"/> Back to login
        </NuxtLink>
        <div v-if="message" :class="{'text-green-500': success,'text-red-500': !success}" class="mt-4">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: ''
})

const message = ref('')
const success = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  return errors
}

const onSubmit = async (event: FormSubmitEvent<any>) => {
  try {
    const response = await fetch('https://e-commerce-20lb.onrender.com/user/forgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: state.email })
    })
    if(response.status===404){
      alert("user not found check your email correctly")
    }
   
    
    const result = await response.json()
    
    if (response.ok) {
      message.value = 'Reset link sent to your email.'
      success.value = true
    } else {
      message.value = result.error || 'Something went wrong.'
      success.value = false
    }
  } catch (error) {
    message.value = 'An error occurred. Please try again.'
    success.value = false
  }
}
</script>

<style scoped>
.forgot {
  width: 80%;
  margin: 25px auto;
}

.change {
  width: 50%;
  margin: 25px auto;
}
</style>
