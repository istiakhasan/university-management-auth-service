import express from 'express'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { StudentRoutes } from '../modules/student/student.route'
import { usersRouters } from '../modules/user/user.route'
import { academicSemesterRouters } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'
import managementRouter from '../modules/managementDepartment/managementDepartment.route'
import adminRouter from '../modules/admin/admin.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
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
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/management-departments',
    route: managementRouter,
  },
  {
    path: '/admins',
    route: adminRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
