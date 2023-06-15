import { z } from 'zod'

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({ required_error: 'First name is required' })
          .optional(),
        middleName: z.string().optional(),
        lastName: z
          .string({ required_error: 'Last name is required' })
          .optional(),
      })
      .optional(),
    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .optional(),
    email: z.string({ required_error: 'Email is required' }).email().optional(),
    contactNo: z
      .string({ required_error: 'Contact no is required' })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: 'Emergency contact no is required',
      })
      .optional(),
    gender: z
      .enum(['male', 'female'], {
        required_error: 'Gender is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent address is required',
      })
      .optional(),
    bloodGroup: z.string().optional(),
    managementDepartment: z
      .string({
        required_error: 'Management department is required',
      })
      .optional(),
    designation: z
      .string({ required_error: 'Designation is required' })
      .optional(),
    profileImage: z.string().optional(),
  }),
})

export const AdminValidation = {
  updateAdminZodSchema,
}
