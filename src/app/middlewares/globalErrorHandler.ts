/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { errorlogger } from '../../shared/logger'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
import handlCastError from '../../errors/handlCastError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error, 'error')
  console.log('found an error ==================================')
  // res.status(400).json({ err: error })
  // next()

  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log(`globalErrorHandler~`, error)
    : errorlogger.error('globalerrorHandler', error)
  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []
  console.log('found the error .....')
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'CastError') {
    const simplifiedError = handlCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
