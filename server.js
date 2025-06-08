import 'express-async-errors'

import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import express from 'express'
const app = express()
import morgan from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://jobify-frontend-olive.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies/auth headers
  })
)

// app.use(cors({ origin: '*' }));

// ROUTERS
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

// MIDDLEWARE
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

import cloudinary from 'cloudinary'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(mongoSanitize())

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

// Basic API route for testing
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'API is working!' })
})

// catch all for not found
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'API route not found' })
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
