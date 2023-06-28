import { Server } from 'http'

import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

import urlpatterns from './routes'
import { MONGODB_URI } from './settings'

async function bootstrap () {
  const app = express()
  app.use(helmet())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(morgan('combined'))
  // app.use("/api/auth", require('./Auth/route'))

  urlpatterns.forEach((router, pattern) => {
    app.use(pattern, router)
  })

  const serverOptions = {}
  const server = new Server(serverOptions, app)
  await mongoose.connect(MONGODB_URI)
  server.listen(3000, () => {
    console.log(server.address())
  })
}

bootstrap()
