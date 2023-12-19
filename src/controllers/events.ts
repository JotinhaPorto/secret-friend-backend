import { RequestHandler } from "express";
import * as events from '../services/events'
import { z } from "zod";

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
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ events: eventItem })

}

export const addEvent: RequestHandler = async (req, res) => {
    const addEventSchema = z.object({
        title: z.string(),
        Description: z.string()
    })

    const body = addEventSchema.safeParse(req.body)

    if (!body.success) {
        return res.json({ error: "Dados inválidos" })
    }

    const newEvent = await events.add(body.data)

    if (!newEvent) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ event: newEvent })

}