<template>
  <div class="roles-page">
    <div class="roles-page__content">
      <Suspense>
        <template #default>
          <RoleList />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoleList } from '@/components/RoleList'
</script>
<style lang="scss" scoped></style>
