import { RequestHandler } from "express"
import * as people from '../services/people'
import { z } from "zod"

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

    res.json({ person: item })
}

export const addPerson: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params

    const addPersonSchema = z.object({
        name: z.string(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
    })

    const body = addPersonSchema.safeParse(req.body)

    if (!body.success) {
        return res.json({ error: "Dados inválidos" })
    }

    const newPerson = await people.add({
        name: body.data.name,
        cpf: body.data.cpf,
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
    })

    if (!newPerson) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }

    res.json({ person: newPerson })

}

export const editPerson: RequestHandler = async (req, res) => {
    const { id_event, id_group, id } = req.params

    const editPersonSchema = z.object({
        name: z.string().optional(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm, '')).optional(),
        matched: z.string().optional()
    })

    const body = editPersonSchema.safeParse(req.body)

    if (!body.success) {
        return res.json({ error: "Dados inválidos" })
    }

    const updatedPerson = await people.update({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
        id: parseInt(id)
    }, body.data)

    if (updatedPerson) {
        const personItem = await people.getOne({
            id: parseInt(id),
            id_event: parseInt(id_event),
            id_group: parseInt(id_group)
        })
        return res.json({ person: personItem})
    }
    res.json({ error: "Ocorreu um erro", status: 403 })
}

export const removePerson: RequestHandler = async (req, res) => {
    const { id_event, id_group, id } = req.params


    const deletedPerson = await people.remove({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
        id: parseInt(id)
    })

    if (!deletedPerson) {
        return res.json({ error: "Ocorreu um erro", status: 403 })
    }
    res.json({ person: deletedPerson })
}