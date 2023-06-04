import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// application routes

console.log(process.env)

app.use('/api/v1/users/', usersRouter)
app.get('/', async (req: Request, res: Response) => {
  res.send('h')
})

export default app
