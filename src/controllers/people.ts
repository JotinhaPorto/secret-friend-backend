import { RequestHandler } from "express"
import * as people from '../services/people'
import { z } from "zod"
import { decryptMatch } from "../utils/match"

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
        return res.json({ person: personItem })
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

export const searchPeople: RequestHandler = async (req, res) => {
    const { id_event } = req.params

    const searchPeopleSchema = z.object({
        cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
    })

    const query = searchPeopleSchema.safeParse(req.query)

    if (!query.success) {
        return res.json({ error: "Dados inválidos" })
    }

    const personItem = await people.getOne({
        id_event: parseInt(id_event),
        cpf: query.data.cpf
    })

    if (personItem && personItem.matched) {
        const matchId = decryptMatch(personItem.matched)

        const personMacthed = await people.getOne({
            id_event: parseInt(id_event),
            id: matchId
        })

        if (personMacthed) {
            return res.json({
                person: {
                    id: personItem.id,
                    name: personItem.name
                },
                personMatched: {
                    id: personMacthed.id,
                    name: personMacthed.name
                }
            })
        }
    }

    res.json({ error: "Ocorreu um erro"})
}
