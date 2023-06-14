import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ManagementDepartmentValidation } from './managementDepartment.validation'
import { ManagementDepartmentController } from './managementDepartment.controller'

const managementRouter = express.Router()

managementRouter.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
)

managementRouter.get(
  '/',
  ManagementDepartmentController.getAllManagementDepartments
)
managementRouter.get(
  '/:id',
  ManagementDepartmentController.getSinglelManagementDepartment
)

managementRouter.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),

  ManagementDepartmentController.updateManagementDepartment
)

export default managementRouter
