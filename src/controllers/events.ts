import { RequestHandler } from "express";
import * as events from '../services/events'

export const getAll: RequestHandler = async (req, res) => {
    const items = await events.getAll()

    if (!items) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }
    res.json({ events: items })
}

export const getEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const eventItem = await events.getOne(parseInt(id))

    if (!eventItem) {
        return res.json({ error: "Ocorreu um erro", status: 403, sla: res.json })
    }
    
    res.json({ events: eventItem })

}