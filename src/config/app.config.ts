import dotenv from 'dotenv'

dotenv.config()

const appConfig = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
}

export default appConfig