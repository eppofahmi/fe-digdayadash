<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <img 
          src="/headerlogo.svg" 
          alt="PBNU Logo" 
          class="h-16 w-auto"
        >
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#017534] focus:border-[#017534] sm:text-sm"
                placeholder="admin@pbnu.org"
              >
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#017534] focus:border-[#017534] sm:text-sm"
                placeholder="password"
              >
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.remember"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-[#017534] focus:ring-[#017534] border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Ingat saya
              </label>
            </div>
          </div>

          <div>
            <BaseButton
              type="submit"
              variant="primary"
              size="md"
              :loading="loading"
              class="w-full"
            >
              {{ loading ? 'Memproses...' : 'Masuk' }}
            </BaseButton>
          </div>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h3>
          <div class="text-xs text-gray-600 space-y-1">
            <p><strong>Admin:</strong> admin@pbnu.org / password</p>
            <p><strong>User:</strong> user@pbnu.org / password</p>
            <p><strong>Guest:</strong> guest@pbnu.org / password</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

// Redirect logged-in users to dashboard
const { isLoggedIn } = useAuth()
watchEffect(() => {
  if (import.meta.client && isLoggedIn.value) {
    navigateTo('/')
  }
})

const { login } = useAuth()
const router = useRouter()

const loading = ref(false)
const error = ref('')
const form = reactive({
  email: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await login(form.email, form.password)
    await router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login gagal'
  } finally {
    loading.value = false
  }
}
</script>