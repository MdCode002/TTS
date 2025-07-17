// server/api/auth/login.post.ts
import { readBody, createError } from '#imports'          // h3 helpers auto‑importés
import { serverSupabaseClient } from '#supabase/server'  // ⬅️ nouveau service

export default eventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string }>(event)

  // serverSupabaseClient retourne une Promise → on l'attend
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.auth.signInWithPassword(body)

  if (error) {
    throw createError({ statusCode: 401, message: 'Identifiants invalides.' })
  }

  const { user } = data!

  const { data: profile, error: profileError } = await client
    .from('users')
    .select('role, full_name')
    .eq('user_id', user.id)
    .single()

  if (profileError) {
    throw createError({ statusCode: 500, message: 'Impossible de récupérer le rôle.'+error })
  }

  return {
    id: user.id,
    email: user.email,
    fullName: profile.full_name,
    role: profile.role
  }
})
