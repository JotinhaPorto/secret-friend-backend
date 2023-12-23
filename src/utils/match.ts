
export const encryptMatch = (id: number) => {
    return `${process.env.TOKEN}${id}${process.env.TOKEN}`
}

export const decryptMatch = (match: string) => {
    const idString = match.replace(`${process.env.TOKEN}`, '').replace(`${process.env.TOKEN}`, '')
    return parseInt(idString)
}