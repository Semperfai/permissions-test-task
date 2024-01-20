<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRootStore } from '@/stores/root/root.store'

const router = useRouter()
const route = useRoute()
const groupsStore = useRootStore()

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/' || route.path.startsWith('/groups')
  }
  return route.path === path
}

const menu = ref([
  {
    to: '/',
    text: 'Groups',
    redirectIfGroupsExist: true
  },
  {
    to: '/roles',
    text: 'Roles'
  }
])

const handleNavigation = async (item: { to: string; redirectIfGroupsExist?: boolean }) => {
  if (item.redirectIfGroupsExist) {
    await groupsStore.fetchGroups()
    if (groupsStore.groups.length > 0) {
      router.push(`/groups/${groupsStore.groups[0].id}`)
      return
    }
  }
  router.push(item.to)
}

watchEffect(() => {
  if (route.path === '/' && groupsStore.groups.length > 0) {
    router.push(`/groups/${groupsStore.groups[0].id}`)
  }
})
</script>

<template>
  <div class="items">
    <div
      v-for="item in menu"
      :key="item.to"
      :class="{ item: true, 'router-link-active': isActive(item.to) }"
      @click="handleNavigation(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.items {
  position: relative;
  display: flex;
  gap: 0.75rem;
  padding: 2em 0;

  @media (max-width: 768px) {
    padding: 0.5em 0;
    gap: 0.5rem;
  }
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: all 200ms linear;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}

.item:hover {
  cursor: pointer;
  background-color: rgb(126, 121, 121, 0.5);
}
.router-link-active {
  background-color: grey;
  color: aliceblue;
}
</style>
