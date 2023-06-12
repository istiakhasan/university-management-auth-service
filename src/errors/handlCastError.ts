import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'

const handlCastError = (error: mongoose.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}
export default handlCastError
