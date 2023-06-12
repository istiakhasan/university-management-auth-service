import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routers from './app/routes'
import httpStatus from 'http-status'

const app: Application = express()
//middleware initialize
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// application routes
app.use('/api/v1/', routers)

// app.get('/',  async(req:Request , res:Response ,next:NextFunction) => {
// console.log(x);
// })

app.use(globalErrorHandler)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  })
  next()
})

export default app
