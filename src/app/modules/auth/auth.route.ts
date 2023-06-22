import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
const authRouter = express.Router()

authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
)

export default authRouter
