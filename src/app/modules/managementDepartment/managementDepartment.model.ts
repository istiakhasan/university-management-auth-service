import { Schema, model } from 'mongoose'
import {
  IManagementDepartment,
  ManagementDepartmentModel,
} from './managementDepartment.interface'

const managementSchema = new Schema<
  IManagementDepartment,
  ManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('ManagementDepartment', managementSchema)
export default ManagementDepartment
