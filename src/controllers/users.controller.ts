import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import {
    getAllUsers,
    getUserById,
    createUser
} from '../entities/users/users.repo'
import { PaginatedQuery } from '../interfaces/query.interface'
import { uploadFileAsync } from '../utils/upload.service'

const getAllHandler = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers(req.query as unknown as PaginatedQuery)
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
}

const getByIdHander = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await getUserById((id as unknown) as number)
        if (!user) {
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
        // upload avatar
        let avatar;
        if (req.files && req.files.avatarFile) {
            const { avatarFile } = req.files as unknown as { avatarFile: UploadedFile }
            avatar = await uploadFileAsync(avatarFile, 'avatars')
        }
        const user = await createUser({ name, color, avatar, email, password })
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

export { getAllHandler, getByIdHander, createHandler }