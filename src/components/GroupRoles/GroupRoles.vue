<template>
  <div class="group-roles">
    <div class="group-roles__header">
      <h2>
        Roles for Group:
        <span class="group-roles__role">{{ group?.name }}</span>
      </h2>
      <input
        type="text"
        v-model="search"
        placeholder="Search roles..."
        class="group-roles__search-input"
      />
      <select v-model="selectedPermission" class="group-roles__select">
        <option value="">All Permissions</option>
        <option
          v-for="permission in availablePermissions"
          :key="permission"
          :value="permission"
        >
          {{ permission }}
        </option>
      </select>
    </div>

    <ul class="group-roles__list">
      <li
        v-for="role in paginatedGroupRoles"
        :key="role.id"
        class="group-roles__item"
      >
        <input
          type="checkbox"
          :id="'role-' + role.id"
          v-model="selectedRoleIds"
          :value="role.id"
          class="group-roles__checkbox"
        />
        <label :for="'role-' + role.id"
          >{{ role.name }} - Permissions:
          <span class="group-roles__permissions">{{
            role.permissions.join(", ")
          }}</span></label
        >
      </li>
    </ul>
    <button @click="saveGroupRoles" class="group-roles__save-button">
      Save Changes
    </button>

    <div class="group-roles__pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRootStore } from "@/stores/root/root.store";
import { computed, ref, watch } from "vue";

const props = defineProps({
  groupId: { type: String, required: true },
});

const rootStore = useRootStore();
const search = ref("");
const selectedPermission = ref("");
const currentPage = ref(1);
const pageSize = 5;
const selectedRoleIds = ref<number[]>([]);

const saveGroupRoles = () => {
  const updatedGroup = {
    ...group.value,
    roleIds: selectedRoleIds.value,
  };
  rootStore.updateGroup(updatedGroup);
};

await rootStore.fetchGroups();
await rootStore.fetchRoles();

const group = computed(() =>
  rootStore.groups.find((g) => g.id === props.groupId)
);
const availablePermissions = computed(() => {
  const permissions = new Set();
  rootStore.roles.forEach((role) => {
    role.permissions.forEach((permission) => permissions.add(permission));
  });
  return Array.from(permissions);
});

const totalPages = computed(() => {
  return Math.ceil(filteredGroupRoles.value.length / pageSize);
});

const filteredGroupRoles = computed(() => {
  if (!group.value) return [];
  return rootStore.roles.filter((role) => {
    return (
      group?.value?.roleIds.includes(Number(role.id)) &&
      role.name.toLowerCase().includes(search.value.toLowerCase()) &&
      (selectedPermission.value === "" ||
        role.permissions.includes(selectedPermission.value))
    );
  });
});
const paginatedGroupRoles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredGroupRoles.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value * pageSize < filteredGroupRoles.value.length)
    currentPage.value++;
};

watch(
  group,
  (newGroup) => {
    if (newGroup) {
      selectedRoleIds.value = newGroup.roleIds.slice();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.group-roles {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  &__header {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    align-items: center;
    margin-bottom: 20px;

    @media (max-width: 868px) {
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
    }
  }

  &__role {
    color: #d6a249;
  }

  &__search-input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex-grow: 1;
    margin-right: 10px;

    @media (max-width: 868px) {
      padding: 0.2rem;
      margin-bottom: 10px;
      margin-right: 0;
      flex-grow: 0;
      width: 100%;
      font-size: 12px;
    }
  }
  &__save-button {
    max-width: 200px;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease;
    font-size: 1rem;
    margin-top: 20px;
    @media (max-width: 868px) {
      font-size: 12px;
      padding: 0.2rem 0.75rem;
    }

    &:hover {
      background-color: #0056b3;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
    }

    &:active {
      background-color: #004085;
    }

    &:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  }
  &__select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-width: 150px;

    @media (max-width: 868px) {
      padding: 0.2rem;
      width: 100%;
      font-size: 12px;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
    @media (max-width: 868px) {
      font-size: 12px;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__checkbox {
    margin-right: 10px;
  }

  &__permissions {
    color: #db6a6a;
  }

  &__role-name {
    flex-grow: 1;
  }
  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    color: #000;

    button {
      padding: 5px 10px;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      @media (max-width: 868px) {
        font-size: 12px;
      }

      &:hover {
        background-color: #eee;
      }

      &:disabled {
        color: #aaa;
        cursor: not-allowed;
      }

      &.active {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
      }
    }
  }
}
</style>
