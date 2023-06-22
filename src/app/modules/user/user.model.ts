import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bycrypt from 'bcrypt'
import config from '../../../config'
const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    // faculty:{
    //   type:Schema.Types.ObjectId,
    //   ref:'Faculty'
    // },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, needsPasswordChange: 1, password: 1 }
//   )
//   return user
// }
// userSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bycrypt.compare(givenPassword, savedPassword)
// }
userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { _id: id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 }
  )
}
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bycrypt.compare(givenPassword, savedPassword)
}
userSchema.pre('save', async function (next) {
  //hasing user password
  this.password = await bycrypt.hash(
    this.password,
    Number(config.bcyrypt_salt_rounds)
  )
  next()
})
const User = model<IUser, UserModel>('User', userSchema)

export default User
