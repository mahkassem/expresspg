import { Router } from 'express'
import {
    createHandler,
    getAllHandler,
    getByIdHander
} from '../controllers/users.controller'
import { createValidation } from '../validations/users.validations'

const usersRoutes = Router()

usersRoutes.get('/', getAllHandler)

usersRoutes.get('/:id', getByIdHander)

usersRoutes.post('/', createValidation, createHandler)

export default usersRoutes