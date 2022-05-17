import dotenv from 'dotenv'

dotenv.config()
const env = process.env.ENV || 'dev'

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
}

if(env == 'test') dbConfig.database = process.env.DB_TEST_NAME

export default dbConfig