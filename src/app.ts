import express, { Application, json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
import config from './config'

const app:Application = express()
const port = config.app.port

/**
 * ? Middlewares
 */
app.use(
    cors(),
    helmet(),
    morgan('dev'),
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