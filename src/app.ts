import express, { Application } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// application routes

// console.log(process.env)

app.use('/api/v1/users/', usersRouter)

// app.get('/',  (req , res ,next) => {
//   throw new ApiError(400,"error ")
//   // next('Next error')
// })
// app.use((err,req:Request,res:Response,next:NextFunction)=>{
//   if(err instanceof Error){
//     res.status(400).json({error:err})
//   }else{
//     res.status(500).json({
//       error:'Something went wrong'
//     })
//   }
//   console.log(err);
// })

app.use(globalErrorHandler)

export default app
