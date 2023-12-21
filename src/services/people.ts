import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type GetAllFilters = { id_event: number, id_group: number }
export const getAll = async (filters: GetAllFilters) => {
    try {
        return await prisma.eventPeople.findMany({ where: filters })
    }
    catch (error) {
        return false
    }
}

type GetOneFilter = { id_event: number, id_group: number, id: number }

export const getOne = async (filters: GetOneFilter) => {
    try {
        return await prisma.eventPeople.findUnique({ where: filters })
    }
    catch (error) {
        return false
    }
}