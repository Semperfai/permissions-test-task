<template>
  <div class="role-editor">
    <div v-if="selectedRole" class="role-editor__content">
      <h3 class="role-editor__subtitle">Select Groups:</h3>
      <div
        v-for="group in groups"
        :key="group.id"
        class="role-editor__group-checkbox"
      >
        <input
          type="checkbox"
          :id="'group-' + group.id"
          :value="group.id"
          v-model="selectedGroupIds"
          class="role-editor__checkbox"
        />
        <label :for="'group-' + group.id" class="role-editor__label">{{
          group.name
        }}</label>
      </div>
    </div>
    <BaseButton
      text="Save Changes"
      :method="updateRole"
      class="role-editor__save-button"
    >
      Save Changes
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRootStore } from "@/stores/root/root.store";
import { useRoute } from "vue-router";
import { BaseButton } from "@/shared/ui";

const route = useRoute();
const rootStore = useRootStore();
const roleId = computed(() => route.params.roleId);
const groups = computed(() => rootStore.groups);
const selectedRole = computed(() =>
  rootStore.roles.find((role) => role.id == roleId.value)
);
const selectedGroupIds = ref([]);

watch(
  selectedRole,
  (newRole) => {
    if (newRole) {
      selectedGroupIds.value = newRole?.groupIds?.slice();
    }
  },
  { immediate: true }
);

const updateRole = () => {
  if (selectedRole.value) {
    rootStore.updateRole({
      ...selectedRole.value,
      groupIds: selectedGroupIds.value,
    });
  }
};
</script>

<style scoped lang="scss">
.role-editor {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 10px;
  }

  h2 {
    margin-bottom: 10px;
    color: #333;
  }

  h3 {
    margin-bottom: 5px;
    color: #333;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  &__subtitle {
    margin-bottom: 10px;
  }

  &__group-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.role-editor__save-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
  align-self: flex-start;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    align-self: stretch;
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>
