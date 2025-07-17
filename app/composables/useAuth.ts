export const useAuth = () => {
  const auth = useAuthStore()

  const login = async (email: string, password: string) => {
  try {
    const user = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })

    auth.setUser(user) 

await navigateTo(`/apps/${user.role}`, { external: true })


  } catch (e: any) {
    const message = e?.data?.message || 'Erreur inconnue.'
    auth.error = message
    throw new Error(message)
  }
}




  return { login }
}
