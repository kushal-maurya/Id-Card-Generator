import { User } from '../models'

export const userAuthService = async (payload) => {
    const data = await User.create(payload)
    return data
  }

export const loginService = async (req, res, next) => {
    try {
      const user = await User.findOne({ username, password })
      if (!user) {
        res.status(401).json({
          message: "Login not successful",
          error: "User not found",
        })
      } else {
        res.status(200).json({
          message: "Login successful",
          user,
        })
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
  }