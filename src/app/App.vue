<script setup lang="ts">
import { useRootStore } from "@/stores/root/root.store";
import { DefaultLayout } from "./layouts";
import { Routing } from "@/pages/routing";
import AppNavigation from "./ui/AppNavigation/AppNavigation.vue";
import { BaseNotify } from "@/shared/ui";

import { onBeforeMount } from "vue";

const rootStore = useRootStore();

onBeforeMount(async () => {
  await rootStore.fetchGroups();
  await rootStore.fetchRoles();
});
</script>

<template>
  <DefaultLayout>
    <template #navigation>
      <AppNavigation />
    </template>
    <template #page>
      <Routing />
    </template>
    <BaseNotify />
  </DefaultLayout>
</template>
