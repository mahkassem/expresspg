import { Router } from 'express'
import {
    createHandler,
    getAllHandler,
    getByIdHander
} from '../controllers/users.controller'
import { authGuard } from '../utils/auth.service'
import { createUserValidation } from '../validations/users.validations'

const usersRoutes = Router()

usersRoutes.get('/', authGuard, getAllHandler)

usersRoutes.get('/:id', authGuard, getByIdHander)

usersRoutes.post('/', authGuard, createUserValidation, createHandler)

export default usersRoutes