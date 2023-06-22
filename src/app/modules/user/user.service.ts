import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import AcademicSemester from '../academicSemester/academicSemesterModel'
import { IStudent } from '../student/student.interface'
// import bycrypt from 'bcrypt'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IUser } from './user.interface'
import User from './user.model'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  // hash password
  // user.password=await bycrypt.hash(user.password,Number(config.bcyrypt_salt_rounds))
  //set role
  user.role = 'student'
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )
  //generate student id
  let newUserAllData = null

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id
    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student ')
    }
    //  set student _id into user collection
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user ')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  return newUserAllData
}

const createAdmin = async (admin: IAdmin, user: IUser) => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  //set role
  user.role = 'admin'

  // generate student id and user data
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateAdminId()
    user.id = id
    admin.id = id
    const newAdmin = await Admin.create([admin], { session })
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin')
    }

    user.admin = newAdmin[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }

  return newUserAllData
}
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string
  }
  // set role
  user.role = 'faculty'

  // generate faculty id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const id = await generateFacultyId()
    user.id = id
    faculty.id = id

    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ')
    }

    user.faculty = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}
export const UserService = {
  createStudent,
  createAdmin,
  createFaculty,
}
