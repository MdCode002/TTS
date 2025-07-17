<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
    <!-- Toggle de thème -->
    <!-- <div class="fixed top-4 right-4">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
          >
            <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span class="sr-only">Basculer le thème</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="setTheme('light')">Clair</DropdownMenuItem>
          <DropdownMenuItem @click="setTheme('dark')">Sombre</DropdownMenuItem>
          <DropdownMenuItem @click="setTheme('system')">Système</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div> -->

    <Card class="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <CardHeader class="space-y-4 text-center">
        <div class="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <User class="w-8 h-8 text-primary" />
        </div>
        <div class="space-y-2">
          <CardTitle class="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>Accédez à votre compte Nuxt</CardDescription>
        </div>
      </CardHeader>

      <CardContent class="space-y-6">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Champ Email -->
          <div class="space-y-2">
            <Label for="email">Adresse email</Label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="votre@email.com"
                class="pl-10"
                required
              />
            </div>
          </div>

          <!-- Champ Mot de passe -->
          <div class="space-y-2">
            <Label for="password">Mot de passe</Label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4 text-muted-foreground" />
                <Eye v-else class="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <!-- Options -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Checkbox
                id="remember"
                v-model:checked="formData.remember"
              />
              <Label for="remember" class="text-sm font-normal">
                Se souvenir de moi
              </Label>
            </div>
            <Button variant="link" class="px-0 font-normal text-sm">
              Mot de passe oublié ?
            </Button>
          </div>

          <!-- Bouton de connexion -->
          <Button type="submit" class="w-full" :disabled="isLoading">
            <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </Button>
        </form>

        <!-- Séparateur -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-card px-2 text-muted-foreground">Ou continuer avec</span>
          </div>
        </div>

        <!-- Connexion sociale -->
        <div class="grid grid-cols-2 gap-3">
          <Button variant="outline" class="w-full bg-transparent">
            <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" class="w-full bg-transparent">
            <Github class="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>

        <!-- Lien d'inscription -->
        <div class="text-center text-sm">
          <span class="text-muted-foreground">Pas encore de compte ? </span>
          <Button variant="link" class="px-0 font-normal">
            Créer un compte
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Toast Container -->
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        v-if="toast.show"
        class="bg-destructive text-destructive px-4 py-3 rounded-md shadow-lg flex items-center space-x-2 animate-in fade-in-0 slide-in-from-top-2"
      >
        <AlertCircle class="h-4 w-4" />
        <span class="text-sm font-medium text-white ">{{ toast.message }}</span>
        <Button
          variant="ghost"
          size="sm"
          class="ml-2 h-6 w-6 p-0 hover:bg-destructive/20"
          @click="hideToast"
        >
          <X class="h-3 w-3" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Github, 
  Loader2, 
  Sun, 
  Moon,
  AlertCircle,
  X
} from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'

// État réactif
const showPassword = ref(false)
const isLoading = ref(false)

const formData = ref({
  email: '',
  password: '',
  remember: false,
})

// État du toast
const toast = ref({
  show: false,
  message: '',
})

// Fonction pour afficher le toast
const showToast = (message: string) => {
  toast.value = {
    show: true,
    message,
  }
  
  // Auto-hide après 5 secondes
  setTimeout(() => {
    hideToast()
  }, 5000)
}

// Fonction pour cacher le toast
const hideToast = () => {
  toast.value.show = false
}

const { login } = useAuth()

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await login(formData.value.email, formData.value.password)
  } catch (error: any) {
    showToast(error.message || 'Erreur lors de la connexion')
    console.log(error.message );
    
  } finally {
    isLoading.value = false
  }
}
</script>