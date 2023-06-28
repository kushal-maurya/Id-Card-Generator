import { Router } from 'express'

import { register } from '../../controllers/Auth/auth.js'

const user = Router()

user.route('/').post(register)

export default user