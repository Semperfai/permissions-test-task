import { defineStore } from "pinia";
import { type IRootState, type IGroup, type IRole } from "./types";
import { rolesApi } from "@/shared/api/roles";
import { groupsApi } from "@/shared/api/groups";

export const useRootStore = defineStore("rootStore", {
  state: (): IRootState => {
    return {
      isGlobalLoading: false,
      showMessages: false,
      groups: [],
      roles: [],
    };
  },
  persist: true,
  actions: {
    displayMessage() {
      this.showMessages = true;
      setTimeout(() => {
        this.showMessages = false;
      }, 3000);
    },
    async fetchRoles() {
      try {
        const response = await rolesApi.getRoles();
        console.log("response", response.data);
        this.roles = response.data ?? [];
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },
    async addRole(newRoleData: IRole) {
      try {
        const response = await rolesApi.addRole(newRoleData);
        this.roles.push(response.data);
        this.displayMessage();
      } catch (error) {
        console.error("Error adding new role:", error);
      }
    },
    async updateRole(updatedRole: IRole) {
      try {
        const response = await rolesApi.updateRole(updatedRole.id, updatedRole);
        const index = this.roles.findIndex(
          (role) => role.id === updatedRole.id
        );
        if (index !== -1) {
          this.roles[index] = response.data;
          this.displayMessage();
        }
      } catch (error) {
        console.error("Error updating role:", error);
      }
    },
    async updateRoleGroup(roleId: number, groupId: string) {
      try {
        const response = await rolesApi.getRole(roleId);
        const role = response.data;

        const updatedRole = { ...role, groupId };

        await rolesApi.updateRole(roleId, updatedRole);

        this.roles = this.roles.map((r) => (r.id === roleId ? updatedRole : r));
        this.displayMessage();
      } catch (error) {
        console.error("Error updating role:", error);
      }
    },
    async fetchGroups() {
      try {
        const response = await groupsApi.getGroups();
        console.log("response", response.data);
        this.groups = response.data ?? [];
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    },
    async updateGroup(updatedGroup: IGroup) {
      try {
        const response = await groupsApi.updateGroup(
          updatedGroup.id,
          updatedGroup
        );
        const index = this.groups.findIndex(
          (group) => group.id === updatedGroup.id
        );
        if (index !== -1) {
          this.groups[index] = response.data;
          this.displayMessage();
        }
      } catch (error) {
        console.error("Error updating group:", error);
      }
    },
    async addGroup(newGroupData: IGroup) {
      try {
        const response = await groupsApi.addGroup(newGroupData);
        this.displayMessage();
        this.groups.push(response.data);
      } catch (error) {
        console.error("Error adding new group:", error);
      }
    },
  },
});
