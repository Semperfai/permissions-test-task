export interface IRole {
  id: number
  name: string
  permissions: string[]
}

export interface IGroup {
  id: string
  name: string
  roleIds: number[]
}

export interface IRootState {
  isGlobalLoading: boolean
  groups: IGroup[]
  roles: IRole[]
}
