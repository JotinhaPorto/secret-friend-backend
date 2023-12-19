import { RequestHandler } from "express";
import { z } from "zod";
import * as auth from '../services/auth'

export const login: RequestHandler = (req, res) => {

    const loginSchema = z.object({
        password: z.string()
    });

    const body = loginSchema.safeParse(req.body)

    if (!body.success) {
        return res.json({ error: "Dados inválidos" })
    }

    //Validar senha 
    if (!auth.validatePassword(body.data.password)) {
        return res.json({ error: "Senha incorreta", status: 403 })
    }

    //Gerar o token e retornar os dados da requisição
    res.json({ token: auth.createToken() })

}

export const validate: RequestHandler = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.json({ error: "Precisa enviar um token", status: 403 })
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!auth.validateToken(token)) {
        return res.json({ error: "Token inválido", status: 403 })
    }

    next()

}

