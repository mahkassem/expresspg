import { Router } from 'express'
import { registerHandler, signinHandler } from '../controllers/auth.controller'
import { createUserValidation } from '../validations/users.validations'

const authRoutes = Router()

authRoutes.post('/register', createUserValidation, registerHandler)

authRoutes.post('/signin', signinHandler)

export default authRoutes