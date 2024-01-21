<template>
  <div>
    <div class="role-list">
      <ul class="role-list__items">
        <router-link
          v-for="role in roles"
          :key="role.id"
          :to="`/roles/${String(role.id)}`"
        >
          <li
            class="role-list__item"
            :class="{
              'role-list__item--active': isActiveRole(String(role.id)),
            }"
          >
            {{ role.name }}
          </li>
        </router-link>
      </ul>
    </div>
    <button @click="showForm = true" class="role-list__add-button">
      Add New Role
    </button>
    <div v-if="showForm" class="modal-overlay">
      <div class="modal">
        <input
          type="text"
          v-model="newRoleName"
          placeholder="Role Name"
          class="modal__input"
        />
        <div class="modal__button-group">
          <button @click="addRole" class="modal__save-button">Save Role</button>
          <button @click="showForm = false" class="modal__close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRootStore } from "@/stores/root/root.store";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const rootStore = useRootStore();
const route = useRoute();
const showForm = ref(false);
const newRoleName = ref("");

const roles = computed(() => rootStore.roles);

const isActiveRole = (roleId: string) => {
  return route.path === `/roles/${roleId}`;
};

const addRole = () => {
  if (newRoleName.value) {
    const newRole = {
      id: String(roles.value.length + 1),
      name: newRoleName.value,
      permissions: [],
      groupIds: [],
    };
    rootStore.addRole(newRole);
    newRoleName.value = "";
    showForm.value = false;
  }
};
</script>

<style scoped lang="scss">
.role-list {
}

.role-list__items {
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 5px;
  margin-bottom: 20px;
}

.role-list__item {
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
    font-size: 9px;
    padding: 5px;
  }
}

.role-list__item:last-child {
  border-bottom: none;
}

.role-list__add-button {
  float: right;
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

.role-list__add-button:hover {
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

.role-list__item--active {
  background-color: rgb(50, 48, 48);
  color: white;
}
</style>
