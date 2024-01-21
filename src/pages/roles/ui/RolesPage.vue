<template>
  <div class="roles-page">
    <div class="roles-page__content">
      <div class="roles-page__main">
        <Suspense>
          <template #default>
            <router-view />
          </template>
          <template #fallback>
            <div>
              <BaseSpinner />
            </div>
          </template>
        </Suspense>
      </div>
      <div class="roles-page__sidebar">
        <RoleList />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoleList } from "@/components/RoleList";
import { BaseSpinner } from "@/shared/ui";
</script>

<style lang="scss" scoped>
.roles-page {
  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__sidebar {
    flex: 1 1 30%;
  }

  &__main {
    flex: 1 1 70%;
    background-color: rgb(50, 48, 48);
    padding: 15px;
  }
}
</style>
