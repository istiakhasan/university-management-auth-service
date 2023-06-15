import express from 'express'
import { AdminController } from './admin.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AdminValidation } from './admin.validation'

const adminRouter = express.Router()
adminRouter.get('/', AdminController.getAllAdmins)
adminRouter.get('/:id', AdminController.getSingleAdmin)
adminRouter.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),

  AdminController.updateAdmin
)
export default adminRouter
