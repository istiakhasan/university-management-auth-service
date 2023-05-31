import express from 'express'
import userController from './users.controller'
const usersRouter = express.Router()

usersRouter.post('/create-user', userController.createUser)

export default usersRouter
