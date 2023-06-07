import express from 'express'
import { usersRouters } from '../modules/user/user.route'
import { academicSemesterRouters } from '../modules/academicSemester/academicSemester.route'
const router = express.Router()
const moduleRoutes = [
  {
    path: '/users/',
    route: usersRouters,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRouters,
  },
]

moduleRoutes.forEach(item => {
  router.use(item.path, item.route)
})

export default router
