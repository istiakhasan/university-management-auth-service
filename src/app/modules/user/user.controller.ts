import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { Request, Response } from 'express'

export const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...user } = req.body
  const result = await UserService.createStudent(student, user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...user } = req.body
  const result = await UserService.createAdmin(admin, user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})

export const userController = { createStudent, createAdmin }
