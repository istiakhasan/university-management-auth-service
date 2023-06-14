import { Model } from 'mongoose'

export type IManagementDepartment = {
  title: string
}
export type IManagementDepartmentFilters = {
  searchTerm?: string
}
export type ManagementDepartmentModel = Model<IManagementDepartment, object>
