import type { RouteRecordRaw } from "vue-router";
import { GroupsPage } from "./groups";
import { RolesPage } from "./roles";
import { GroupRoles } from "@/components/GroupRoles";
import { RoleEditor } from "@/components/RoleEditor";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: GroupsPage,
    children: [
      {
        path: "groups/:groupId",
        component: GroupRoles,
        props: true,
      },
    ],
  },
  {
    path: "/roles",
    name: "roles",
    component: RolesPage,
    children: [
      {
        path: ":roleId",
        component: RoleEditor,
        props: true,
      },
    ],
  },
];
