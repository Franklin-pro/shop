<template>
  <div class="forgot">
      <div class="flex flex-col justify-center text-center i change">
          <div>
              <h1 class="font-bold p-3 text-2xl">Change Password</h1>
              <p class="p-2">Please set a new password</p>
          </div>
          <div class="flex flex-col justify-cent">
              <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                  <UFormGroup name="new">
                      <UInput v-model="state.new" type="password" icon="i-heroicons-lock-closed-16-solid" placeholder="New Password" />
                  </UFormGroup>
                  <UFormGroup name="password">
                      <UInput v-model="state.password" type="password" placeholder="Confirm New Password" icon="i-heroicons-lock-closed-16-solid" />
                  </UFormGroup>
                  <UButton type="submit" class="w-full flex items-center text-xl text-primary justify-center" color="primary" variant="solid">Reset</UButton>
              </UForm>

              <NuxtLink to="/login" class="flex items-center hover:text-primary">
                  <UIcon name="i-heroicons-chevron-left-16-solid" class="text-3xl" /> Back to login
              </NuxtLink>
              <div v-if="message" :class="{'text-green-500': success, 'text-red-500': !success}" class="mt-4">{{ message }}</div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  new: '',
  password: ''
})

const message = ref('')
const success = ref(false)
const route = useRoute()
const router = useRouter()

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.new) errors.push({ path: 'new', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  if (state.new !== state.password) errors.push({ path: 'password', message: 'Passwords do not match' })
  return errors
}

const onSubmit = async (event: FormSubmitEvent<any>) => {
  try {
      const token = route.query.token
      const response = await fetch('https://e-commerce-20lb.onrender.com/reset-password', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, password: state.new })
      })

      const result = await response.json()

      if (response.ok) {
          message.value = 'Password reset successful.'
          success.value = true
          setTimeout(() => router.push('/login'), 2000)
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
