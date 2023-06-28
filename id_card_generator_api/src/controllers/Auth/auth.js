import { userAuthService, login } from '../../services/auth'
import { userCreateSchema } from '../../validators/user'
 
export const register = async (req, res) => {
    try {
      console.log(req)
      const validatedData = await userCreateSchema.validateAsync(req.body)
      const data = await userAuthService(validatedData)
      return res.status(201).json({
        message: "User successfully created", data})
    } catch (e) {
      return res.status(400).json({message: "User not successful created",
      error: e.mesage,})
    }
  }

export const login = async (req, res, next) => {
    const { username, password } = req.body
    // Check if username and password is provided
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      })
    }else{
      try {
        const data = await login({ username, password })
        return res.status(200).json(data)
      } catch (e) {
        return res.status(400).json(e)
      }
    }
  }