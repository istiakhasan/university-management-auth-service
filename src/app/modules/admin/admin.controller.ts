import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AdminService } from './admin.service'
import pick from '../../../shared/pick'
import { IAdmin } from './admin.interface'

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'id',
    'email',
    'contactNo',
    'emergencyContactNo',
  ])
  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ])

  const result = await AdminService.getAllAdmins(filters, paginationOptions)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admins retrived successfully',
    data: result,
  })
})

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AdminService.getSingleAdmin(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Admin retrived successfully',
    data: result,
  })
})

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AdminService.updateAdmin(id, updatedData)

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully !',
    data: result,
  })
})

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
}
