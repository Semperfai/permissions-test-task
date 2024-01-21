<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRootStore } from "@/stores/root/root.store";

const router = useRouter();
const route = useRoute();
const rootStore = useRootStore();

const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/" || route.path.startsWith("/groups");
  } else if (path === "/roles") {
    return route.path.startsWith("/roles");
  }
  return route.path === path;
};

const menu = ref([
  {
    to: "/",
    text: "Groups",
    redirectIfExist: true,
    redirectPath: "/groups",
  },
  {
    to: "/roles",
    text: "Roles",
    redirectIfExist: true,
    redirectPath: "/roles",
  },
]);

const handleNavigation = async (item: {
  to: string;
  redirectIfExist?: boolean;
  redirectPath: string;
}) => {
  if (item.redirectIfExist) {
    await rootStore.fetchGroups();
    await rootStore.fetchRoles();
    if (item.to === "/roles" && rootStore.roles.length > 0) {
      router.push(`${item.redirectPath}/${rootStore.roles[0].id}`);
      return;
    } else if (item.to === "/" && rootStore.groups.length > 0) {
      router.push(`${item.redirectPath}/${rootStore.groups[0].id}`);
      return;
    }
  }
  router.push(item.to);
};

watchEffect(() => {
  if (route.path === "/" && rootStore.groups.length > 0) {
    router.push(`/groups/${rootStore.groups[0].id}`);
  }
});
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
