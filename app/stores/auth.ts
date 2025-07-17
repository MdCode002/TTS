import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { AppUser, UserRole } from '~/types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AppUser | null>(null)
  const role = computed(() => user.value?.role || null)
  const error = ref<string | null>(null)

  const setUser = (data: AppUser) => {
    user.value = data
  }

  const logout = async () => {
    await useSupabaseClient().auth.signOut()
     navigateTo(`/login`)
    user.value = null
    console.log(user.value);
    
  }

  return {
    user,
    role,
    error,
    setUser,
    logout,
    isAuthenticated: computed(() => !!user.value),
  }
})


