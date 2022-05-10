import { Request, Response } from 'express'
import {
    getAllUsers,
    getUserById,
    createUser
} from '../entities/users/users.repo'

const getAllHandler = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers()
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
}

const getByIdHander = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await getUserById((id as unknown) as number)
        if(!user) {
            res.status(404).send('User not found')
            return
        }
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

const createHandler = async (req: Request, res: Response) => {
    try {
        const { name, color, email, password } = req.body
        const user = await createUser({ name, color, email, password })
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

export { getAllHandler, getByIdHander, createHandler }