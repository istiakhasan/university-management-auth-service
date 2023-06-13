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
router.get('/', AcademisSemesterController.getAllSemester)
router.delete('/:id', AcademisSemesterController.deleteSemester)
router.get('/:id', AcademisSemesterController.getSingleSemester)
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademisSemesterController.updateSemester
)

export const academicSemesterRouters = router
