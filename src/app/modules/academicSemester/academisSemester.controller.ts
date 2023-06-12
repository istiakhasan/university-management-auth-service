import { NextFunction, Request, Response } from 'express'
import { AcademisSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterFilterAbleFields } from './academicSemester.constant'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academisSemerterData } = req.body
    const result = await AcademisSemesterService.createSemester(
      academisSemerterData
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    })
    next()
  }
)

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterAbleFields)
    const paginatinsOptions = pick(req.query, paginationFields)

    const result = await AcademisSemesterService.getAllSemester(
      paginatinsOptions,
      filters
    )
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)
const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await AcademisSemesterService.getSingleSemester(id)

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      data: result,
    })
    next()
  }
)

const updateSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const updateData = req.body

    const result = await AcademisSemesterService.updateSemester(id, updateData)

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully',
      data: result,
    })
    next()
  }
)
export const AcademisSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
}
