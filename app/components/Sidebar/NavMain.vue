<script setup lang="ts"> 
import { type LucideIcon } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

import {
  Collapsible,
} from '@/components/ui/collapsible'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon 
  }[]
}>()

const route = useRoute()

const isActive = (url: string) => computed(() =>
  route.path === url
)
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <SidebarMenuButton 
            :tooltip="item.title"
            :class="[
              'w-full text-left transition-all',
              isActive(item.url).value
                ? 'bg-primary/10 hover:bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                : 'hover:bg-muted hover:text-foreground text-muted-foreground'
            ]"
            as-child
          >
            <NuxtLink :to="item.url" class="flex items-center gap-3 px-2 py-2">
              <component 
                :is="item.icon" 
                v-if="item.icon" 
                :class="[
                  'transition-all',
                  isActive(item.url).value
                    ? 'text-primary h-6 w-6'
                    : 'text-muted-foreground h-6 w-6'
                ]"
              />
              <span :class="[
                'transition-all',
                isActive(item.url).value ? 'font-medium' : 'font-normal'
              ]">
                {{ item.title }}
              </span>
            </NuxtLink>
          </SidebarMenuButton>                    
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
