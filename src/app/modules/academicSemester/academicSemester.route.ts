import express from 'express'

import validateRequest from '../../middlewares/validateRequest'

import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademisSemesterController } from './academisSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademisSemesterController.createSemester
)

export const academicSemesterRouters = router
