import dotenv from 'dotenv'

dotenv.config()

const authConfig = {
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 8,
    bcryptPapper: process.env.BCRYPT_PAPPER as string,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiration: process.env.JWT_EXPIRATION as string,
}

export default authConfig