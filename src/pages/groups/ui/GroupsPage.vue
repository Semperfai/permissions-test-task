<script lang="ts" setup>
import { GroupList } from "@/components/GroupList";
import { BaseSpinner } from "@/shared/ui";
</script>

<template>
  <div class="groups-page">
    <div class="groups-page__content">
      <div class="groups-page__sidebar">
        <GroupList />
      </div>
      <div class="groups-page__main">
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
.groups-page {
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
