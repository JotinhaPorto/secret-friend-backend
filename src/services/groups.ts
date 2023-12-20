import { Prisma, PrismaClient } from "@prisma/client"
import * as events from './events'

const prisma = new PrismaClient()

export const getAll = async (id_event: number) => {
    try {
        return await prisma.eventGroup.findMany({ where: { id_event } })
    }
    catch (error) {
        return false
    }
}
type GetOneFilters = { id: number, id_event: number }
export const getOne = async (filters: GetOneFilters) => {
    try {
        return await prisma.eventGroup.findUnique({ where: filters })
    }
    catch (error) {
        return false
    }
}
type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, 'create'>['data']
export const add = async (data: GroupsCreateData) => {
    try {
        if (!data.id_event) {
            return false
        }

        const hasEventItem = await events.getOne(data.id_event)

        if (!hasEventItem) {
            return false
        }

        return await prisma.eventGroup.create({ data })
    }
    catch (error) {
        return false
    }
}

type UpdateFilters = { id: number, id_event: number }
type GroupsUpdateData = Prisma.Args<typeof prisma.eventGroup, 'update'>['data']

export const update = async (filters: UpdateFilters, data: GroupsUpdateData) => {
    try {
        return await prisma.eventGroup.update({ where: filters, data })
    }
    catch (error) {
        return false
    }
}

type RemoveFilters = { id: number, id_event: number }
export const remove = async (filters: RemoveFilters) => {
    try {
        return await prisma.eventGroup.delete({ where: filters })
    }
    catch (error) {
        return false
    }
}