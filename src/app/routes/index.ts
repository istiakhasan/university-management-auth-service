import express from 'express'
import { usersRouters } from '../modules/user/user.route'
import { academicSemesterRouters } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
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
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
]

moduleRoutes.forEach(item => {
  router.use(item.path, item.route)
})

export default router
