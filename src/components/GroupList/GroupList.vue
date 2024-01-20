<template>
  <div>
    <div class="group-list">
      <ul class="group-list__items">
        <router-link
          v-for="group in rootStore.groups"
          :key="group.id"
          :to="`/groups/${group.id}`"
        >
          <li
            class="group-list__item"
            :class="{ 'group-list__item--active': isActiveGroup(group.id) }"
          >
            {{ group.name }}
          </li>
        </router-link>
      </ul>
    </div>
    <button @click="showForm = true" class="group-list__add-button">
      Add New Group
    </button>
    <div v-if="showForm" class="modal-overlay">
      <div class="modal">
        <p v-if="!newGroupName" class="modal__req">Role name is required*</p>

        <input
          type="text"
          v-model="newGroupName"
          placeholder="Group Name"
          class="modal__input"
        />
        <p class="modal__title">Roles</p>
        <div v-for="role in roles" :key="role.id" class="modal__checkbox-group">
          <label class="modal__label">
            <input
              type="checkbox"
              :value="Number(role.id)"
              v-model="selectedRoleIds"
              class="modal__checkbox"
            />
            {{ role.name }}
          </label>
        </div>
        <button
          :disabled="isDisabled"
          @click="addGroup"
          class="modal__save-button"
        >
          Save Group
        </button>
        <button @click="showForm = false" class="modal__close-button">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRootStore } from "@/stores/root/root.store";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const rootStore = useRootStore();
const route = useRoute();

const showForm = ref(false);
const newGroupName = ref("");
const selectedRoleIds = ref([]);

const isActiveGroup = (groupId: string) => {
  return route.path === `/groups/${groupId}`;
};
const roles = computed(() => {
  return rootStore.roles;
});
const isDisabled = computed(() => {
  return !newGroupName.value || selectedRoleIds.value.length === 0;
});
const addGroup = () => {
  const newGroup = {
    id: String(
      Math.max(0, ...rootStore.groups.map((group) => Number(group.id))) + 1
    ),
    name: newGroupName.value,
    roleIds: selectedRoleIds.value,
  };
  rootStore.addGroup(newGroup);
  showForm.value = false;
  newGroupName.value = "";
  selectedRoleIds.value = [];
};

onBeforeMount(async () => {
  await rootStore.fetchGroups();
  await rootStore.fetchRoles();
});
</script>

<style scoped lang="scss">
.group-list {
}

.group-list__items {
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 5px;
  margin-bottom: 20px;
}

.group-list__item {
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    text-align: left;
    font-size: 9px;
    padding: 5px;
  }
}

.group-list__item:last-child {
  border-bottom: none;
}

.group-list__add-button {
  display: block;
  padding: 10px;
  color: white;
  border-radius: 5px;
  background-color: rgb(50, 48, 48);
  text-align: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 5px;
  }
}

.group-list__add-button:hover {
  background-color: #1f1c1c;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 400px;

  @media screen and (max-width: 768px) {
    max-width: 80%;
    padding: 10px;
  }

  &__title {
    margin-bottom: 10px;
    color: #000;
  }

  &__req {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
  }
}

.modal__input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal__checkbox-group {
  margin-bottom: 10px;
}

.modal__label {
  display: block;
  cursor: pointer;
  color: #000;
}

.modal__checkbox {
  margin-right: 10px;
}

.modal__save-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal__save-button:hover {
  background-color: #0056b3;
}

.modal__close-button {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.modal__close-button:hover {
  background-color: #5a6268;
}

.group-list__item--active {
  background-color: rgb(50, 48, 48);
  color: white;
}
</style>
