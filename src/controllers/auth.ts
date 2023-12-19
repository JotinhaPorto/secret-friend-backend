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