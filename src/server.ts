import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`Rodando na porta ${port}`)
    })
}

const devServer = http.createServer(app)

if (process.env.NODE_ENV === 'production') {
    //
}

else {
    const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 9000
    runServer(serverPort, devServer)
}

// 