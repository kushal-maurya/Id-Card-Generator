import { Router } from 'express'
import user from './user'

const urlpatterns = new Map([
  ['/user',user]
  ,
])

const api = Router()

urlpatterns.forEach((router, pattern) => {
  api.use(pattern, router)
})

export default api
