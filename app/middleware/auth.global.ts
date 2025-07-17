export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const authStore = useAuthStore()

  const allowedRoles = ['admin', 'gestionnaire', 'client']
  const isLoginPage = to.path === '/login'

  // 1. Synchroniser l'utilisateur si pas encore dans le store
  if (user.value && !authStore.user) {
    const { data, error } = await supabase
      .from('users')
      .select('role, full_name')
      .eq('user_id', user.value.id)
      .single()

    if (error || !data) {
      console.warn('Erreur récupération utilisateur Supabase:', error?.message)
      return navigateTo('/login')
    }

    authStore.setUser({
      id: user.value.id,
      email: user.value.email!,
      fullName: data.full_name,
      role: data.role
    })
  }

  const currentUser = authStore.user

  // 2. Si pas connecté → /login
  if (!currentUser) {
    if (!isLoginPage) return navigateTo('/login')
    return
  }

  const currentRole = currentUser.role

  // 3. Si rôle invalide → /login
  if (!allowedRoles.includes(currentRole)) {
    console.warn('Rôle non reconnu:', currentRole)
    return navigateTo('/login')
  }

  const basePath = `/apps/${currentRole}`

  // 4. Si essaie d'accéder à un autre dashboard que le sien → redirige vers le sien
  const pathRegex = new RegExp(`^/apps/(${allowedRoles.join('|')})`)
  if (pathRegex.test(to.path) && !to.path.startsWith(basePath)) {
    console.warn(`Tentative d'accès non autorisée à ${to.path}`)
    return navigateTo(basePath)
  }

  // 5. Si l'utilisateur connecté accède à /login → redirige vers son dashboard
  if (isLoginPage) {
    return navigateTo(basePath)
  }
})
