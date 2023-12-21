import { RequestHandler } from "express"
import * as people from '../services/people'

export const getAll: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params

    const items = await people.getAll({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if (!items) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ people: items })
}

export const getOne: RequestHandler = async (req, res) => {
    const { id_event, id_group, id } = req.params

    const item = await people.getOne({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
        id: parseInt(id)
    })

    if (!item) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ people: item })
}