/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IAdmin } from '../admin/admin.interface'
import { IFaculty } from '../faculty/faculty.interface'

export type IUser = {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
  admin?: Types.ObjectId | IAdmin
  needsPasswordChange: true | false
}
// export type IUserMethod = {
//   isUserExist(id: string): Promise<Partial<IUser>|null>
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>
// }
export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange' | 'role'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethod>
