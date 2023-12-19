import { RequestHandler } from "express";
import * as events from '../services/events'
import { boolean, z } from "zod";

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

export const editEvent: RequestHandler = async (req, res) => {
    const { id } = req.params

    const editEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        Description: z.string().optional(),
        grouped: z.boolean().optional()
    })

    const body = editEventSchema.safeParse(req.body)

    if (!body.success) {
        return res.json({ error: "Dados inválidos" })
    }

    const updatedEvent = await events.update(parseInt(id), body.data)

    if (!updatedEvent) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }
    res.json({ event: updatedEvent })
}