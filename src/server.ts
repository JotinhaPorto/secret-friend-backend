import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import adminRoutes from './routes/admin'
import siteRoutes from './routes/site'

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(siteRoutes)
app.use('/admin', adminRoutes)

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`Rodando na porta ${port}`)
    })
}

const devServer = http.createServer(app)

//Roda em ambiente de desenvolvimento
runServer(80, devServer)


