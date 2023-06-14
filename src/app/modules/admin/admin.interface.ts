import { Model, Types } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}
export type IAdmin = {
  id: string
  name: UserName //embedded object
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  designation: string
  presentAddress: string
  permanentAddress: string

  managementDepartment: Types.ObjectId
  //  | IAcademicFaculty // reference _id

  profileImage?: string
}

export type AdminModel = Model<IAdmin, object>
