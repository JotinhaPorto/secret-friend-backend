import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.event.findMany()
    }
    catch (error) {
        return false
    }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.event.findUnique({ where: { id } })
    }
    catch (error) {
        return false
    }
}



// Cria um tipo com os itens obrigatorios pra criar o event
type EventCreateData = Prisma.Args<typeof prisma.event, 'create'>['data']

export const add = async (data: EventCreateData) => {
    try {
        return await prisma.event.create({ data })
    }
    catch (error) {
        return false
    }
}