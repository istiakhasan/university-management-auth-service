import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ManagementDepartmentService } from './managementDepartment.service'
import pick from '../../../shared/pick'
import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import { paginationFields } from '../../../constants/pagination'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...payload } = req.body

    const result = await ManagementDepartmentService.createManagement(payload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    })
  }
)
const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields)

    const paginationOptions = pick(req.query, paginationFields)

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department retrieved successfully',
      data: result,
    })
  }
)
const getSinglelManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result =
      await ManagementDepartmentService.getSinglelManagementDepartment(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department fetched successfully',
      data: result,
    })
  }
)
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const { ...updateData } = req.body
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updateData
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department fetched successfully',
      data: result,
    })
  }
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSinglelManagementDepartment,
  updateManagementDepartment,
}
