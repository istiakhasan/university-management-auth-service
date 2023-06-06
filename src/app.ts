import express, { Application } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { usersRouters } from './app/modules/user/user.route'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// application routes

// console.log(process.env)

app.use('/api/v1/users/', usersRouters)

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
