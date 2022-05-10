import { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import config from '../config';
import { User } from '../entities/users/user.model';
import { getUserByEmail } from '../entities/users/users.repo';

const generateToken = (user: User): string => {
    const token = jwt.sign(
        {
            sub: user.email,
            name: user.name
        },
        config.auth.jwtSecret,
        { expiresIn: config.auth.jwtExpiration }
    )
    return token
}

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get token from header
        const tokenObj = req.headers.authorization
        const token = tokenObj?.split(' ')[1]

        // verify token
        const verify = jwt.verify(token as string, config.auth.jwtSecret)
        if (!verify) {
            res.status(401).send('Invalid token')
            return
        }

        // get user by email
        const user = await getUserByEmail(verify.sub as string)

        if (!user) {
            res.status(401).send('User no longer exists')
            return
        }

        // set user on request
        res.locals.user = user

        next()
    } catch (err) {
        res.status(400).send(err)
        return
    }
}

export { authGuard, generateToken }