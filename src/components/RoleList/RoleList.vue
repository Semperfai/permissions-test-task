<template>
  <div class="roles-edit">
    <div class="roles-edit__roles">
      <input
        type="text"
        v-model="search"
        placeholder="Search roles..."
        class="roles-edit__search-input"
      />

      <ul class="roles-edit__role-list">
        <li v-for="role in paginatedRoles" :key="role.id" class="roles-edit__role-item">
          {{ role.name }}
          <div class="roles-edit__group-selector">
            <select v-model="roleToGroupMap[role.id]">
              <option value="">Select Group</option>
              <option v-for="group in rootStore.groups" :key="group.id" :value="group.id">
                {{ group.name }}
              </option>
            </select>
          </div>
        </li>
      </ul>
      <button @click="saveChanges">Save Changes</button>
      <div class="roles-edit__pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRootStore } from '@/stores/root/root.store'
import { computed, ref, reactive, onMounted } from 'vue'

const rootStore = useRootStore()
const search = ref('')
const currentPage = ref(1)
const pageSize = 5
const roleToGroupMap = reactive({})

await rootStore.fetchGroups()
await rootStore.fetchRoles()

const filteredRoles = computed(() => {
  return rootStore.roles.filter((role) =>
    role.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const saveChanges = async () => {
  for (const roleId of Object.keys(roleToGroupMap)) {
    const groupId = roleToGroupMap[roleId]
    await rootStore.updateRoleGroup(roleId, groupId)
  }
}

const paginatedRoles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredRoles.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredRoles.value.length / pageSize)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value * pageSize < filteredRoles.value.length) currentPage.value++
}

onMounted(() => {
  rootStore.roles.forEach((role) => {
    roleToGroupMap[role.id] = role.groupId || ''
  })
})
</script>

<style lang="scss">
.roles-edit {
  display: flex;
  justify-content: center;
  &__roles {
    width: 100%;
    max-width: 50%;
    padding: 20px;

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }

  &__search-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &__role-list {
    list-style-type: none;
    padding: 0;
  }

  &__role-item {
    color: #000;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #f9f9f9;

    &:hover {
      background-color: #f3f3f3;
    }
  }

  &__group-selector {
    color: #000;
    margin-top: 10px;

    select {
      color: #000;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;

      option {
        color: #000;
      }
    }
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
