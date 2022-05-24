import express, { Application, json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
import config from './config'
import fileUpload from 'express-fileupload'

const app: Application = express()
const port = config.app.port

/**
 * ? fileUpload
 */
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true
}))


/**
 * ? Middlewares
 */
app.use(
    cors(),
    helmet(),
    morgan('dev'),
    urlencoded({ extended: true }),
    json()
)

/**
 * ? Routes
 */
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})

export default app