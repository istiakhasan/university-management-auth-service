import express from 'express'
import { userController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  userController.createStudent
)
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  userController.createAdmin
)

export const usersRouters = router
