import { defineStore } from 'pinia'
import { type IRootState, type IGroup } from './types'
import { rolesApi } from '@/shared/api/roles'
import { groupsApi } from '@/shared/api/groups'

export const useRootStore = defineStore('rootStore', {
  state: (): IRootState => {
    return {
      isGlobalLoading: false,
      groups: [],
      roles: []
    }
  },
  persist: true,
  actions: {
    async fetchRoles() {
      try {
        const response = await rolesApi.getRoles()
        console.log('response', response.data)
        this.roles = response.data ?? []
      } catch (error) {
        console.error('Error fetching roles:', error)
      }
    },
    async updateRoleGroup(roleId: number, groupId: string) {
      try {
        const response = await rolesApi.getRole(roleId)
        const role = response.data

        const updatedRole = { ...role, groupId }

        await rolesApi.updateRole(roleId, updatedRole)

        this.roles = this.roles.map((r) => (r.id === roleId ? updatedRole : r))
      } catch (error) {
        console.error('Error updating role:', error)
      }
    },
    async fetchGroups() {
      try {
        const response = await groupsApi.getGroups()
        console.log('response', response.data)
        this.groups = response.data ?? []
      } catch (error) {
        console.error('Error fetching groups:', error)
      }
    },
    async updateGroup(updatedGroup: IGroup) {
      try {
        const response = await groupsApi.updateGroup(updatedGroup.id, updatedGroup)
        const index = this.groups.findIndex((group) => group.id === updatedGroup.id)
        if (index !== -1) {
          this.groups[index] = response.data
        }
      } catch (error) {
        console.error('Error updating group:', error)
      }
    },
    async addGroup(newGroupData: IGroup) {
      try {
        const response = await groupsApi.addGroup(newGroupData)
        this.groups.push(response.data)
      } catch (error) {
        console.error('Error adding new group:', error)
      }
    }
  }
})
