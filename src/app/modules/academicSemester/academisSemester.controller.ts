import { NextFunction, Request, Response } from 'express'
import { AcademisSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

export const createSemester = catchAsync(
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

export const AcademisSemesterController = {
  createSemester,
}
