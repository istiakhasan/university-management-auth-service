import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { z } from 'zod'

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required rr',
        }),
        password: z.string().optional(),
      }),
    })
    await createZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully..',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const userController = { createUser }
