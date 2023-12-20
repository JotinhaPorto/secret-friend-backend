import { RequestHandler } from "express";
import * as groups from '../services/groups'
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const { id_event } = req.params
    const items = await groups.getAll(parseInt(id_event))

    if (!items) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ group: items })
}
export const getGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params

    const groupItem = await groups.getOne({
        id: parseInt(id),
        id_event: parseInt(id_event)
    })

    if (!groupItem) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ group: groupItem })
}
export const addGroup: RequestHandler = async (req, res) => {

    const { id_event } = req.params

    const addGroupSchema = z.object({
        name: z.string()
    })

    const body = addGroupSchema.safeParse(req.body)

    if (!body.success) {
        return res.json({ error: "Dados inválidos" })
    }

    const newGroup = await groups.add({
        name: body.data.name,
        id_event: parseInt(id_event)
    })

    if (!newGroup) {
        return res.json({ error: "Ocorreu algum erro", status: 403 })
    }

    res.json({ group: newGroup })
}
export const editGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params

    const editGroupSchema = z.object({
        name: z.string()
    })

    const body = editGroupSchema.safeParse(req.body)

    if (!body.success) {
        return res.json({ error: "Dados inválidos" })
    }

    const updatedGroup = await groups.update({
        id: parseInt(id),
        id_event: parseInt(id_event)
    }, body.data)

    if (!updatedGroup) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ group: updatedGroup })
}
export const deleteGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params

    const deleteEvent = await groups.remove({
        id: parseInt(id),
        id_event: parseInt(id_event)
    })

    if (!deleteEvent) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ group: deleteEvent })
}