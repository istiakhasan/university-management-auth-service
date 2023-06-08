import express, { Application } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routers from './app/routes'

const app: Application = express()
//middleware initialize
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// application routes
app.use('/api/v1/', routers)

// app.use('/api/v1/users/', usersRouters)
// app.use('/api/v1/academic-semesters', academicSemesterRouters)

// app.get('/',  async(req:Request , res:Response ,next:NextFunction) => {
// console.log(x);
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
