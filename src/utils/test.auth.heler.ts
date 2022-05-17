import config from "../config"
import bcrypt from "bcrypt"
import { User } from "../entities/users/user.model"
import { createUser, getUserByEmail } from "../entities/users/users.repo"
import jwt from "jsonwebtoken"

export interface TestUser {
    token: string
    user: User
}

export const createTestUser = async (): Promise<TestUser> => {
    const user = {
        name: 'Test User',
        color: '#ffffff',
        email: 'auth@test.com',
        password: 'secret'
    }

    let { email, password } = user;

    // hash password
    password = await bcrypt.hash(password + config.auth.bcryptPapper, config.auth.bcryptRounds)
    user.password = password
    
    // check if user exists
    let createdUser;
    createdUser = await getUserByEmail(email)
    if (!createdUser) {
        createdUser = await createUser(user)
    }

    const token = jwt.sign(
        {
            sub: user.email,
            name: user.name
        },
        config.auth.jwtSecret,
        { expiresIn: config.auth.jwtExpiration }
    )

    return { token, user: createdUser }
}