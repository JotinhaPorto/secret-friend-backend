import { RequestHandler } from "express";
import * as events from '../services/events'

export const getAll: RequestHandler = async (req, res) => {
    const items = await events.getAll()

    if (!items) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }
    res.json({ events: items })

}