import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import https from 'https'
import adminRoutes from './routes/admin'
import siteRoutes from './routes/site'
import fs from 'fs'

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

if (process.env.NODE_ENV === 'production') {
    //Configurar certificado: gero dois arquivos no servidor e referencio eles aqui
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY as string),
        cert: fs.readFileSync(process.env.SSL_CERT as string)
    }

    const secServer = https.createServer(options, app)
    
    //Roda em ambiente de desenvolvimento
    runServer(80, devServer)
    
    //Roda em ambiente de produção
    runServer(443, secServer)
}

else {
    const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 9000
    runServer(serverPort, devServer)
}