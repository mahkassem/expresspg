import { Request, Response } from 'express'
import { createUser, getUserByEmail } from '../entities/users/users.repo'
import bcrypt from 'bcrypt'
import config from '../config'
import { generateToken } from '../utils/auth.service'

const registerHandler = async (req: Request, res: Response) => {
    try {
        let { name, color, email, password } = req.body
        // hash password
        password = await bcrypt.hash(password + config.auth.bcryptPapper, config.auth.bcryptRounds)
        // create user
        const user = await createUser({ name, color, email, password })
        // delete password
        delete user.password
        // send user
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

const signinHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        // get user by email
        const user = await getUserByEmail(email)
        if (!user) {
            res.status(401).send('Invalid email')
            return
        }
        // verify password
        const isValid = await bcrypt.compare(password + config.auth.bcryptPapper, user.password as string)
        if (!isValid) {
            res.status(401).send('Invalid password')
            return
        }

        // generate token
        const token = generateToken(user);
        // send token
        res.send({ token: token })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { registerHandler, signinHandler }