<template>
  <div class="p-2 w-full flex justify-center">
    <div class="lg:w-[50%] md:w-full rounded-x p-4">
      <UCard>
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup name="email">
            <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="Enter email" size="lg" />
          </UFormGroup>
          <UFormGroup name="password">
            <UInput v-model="state.password" type="password" placeholder="Enter password" icon="i-heroicons-lock-closed-16-solid" size="lg"/>
          </UFormGroup>
          <button class="bg-orange-500 hover:bg-orange-600 w-72 py-2 rounded-md text-lg font-bold">Sign-In</button>
        </UForm>
        <NuxtLink to="/forgotpassword" class="flex justify-end pr-4 text-green-500 font-black hover:text-orange-300">Forgot Password?</NuxtLink>
        <div class="p-4"></div>
        <p class="text-center">
          If you don't have an account here? <NuxtLink to="/createaccount" class="text-green-500 font-black hover:text-orange-300">Sign-Up</NuxtLink>
        </p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { FormError } from '#ui/types'
import Button from '~/components/Button.vue'

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
    greetUser(user.fullName)
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

const greetingMessage = ref('')

const greetUser = (fullName: string) => {
  const currentHour = new Date().getHours()
  let greeting = 'Good Evening'
  if (currentHour < 12) {
    greeting = 'Good Morning'
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon'
  }
  greetingMessage.value = `${greeting} , ${fullName}`
  sayHello(greetingMessage.value)
}

const sayHello = (greeting: string) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(greeting)
    window.speechSynthesis.speak(utterance)
  } else {
    console.warn('Speech Synthesis not supported in this browser.')
  }
}

onMounted(() => {
  if (userStore.user) {
    greetUser(userStore.user.fullName)
  }
})
</script>

<style scoped>
img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
</style>
