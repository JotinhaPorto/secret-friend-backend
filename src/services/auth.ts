import { getCurrentDate } from "../utils/getCurrentDate"

export const validatePassword = (password: string) => {
    const currentPassword = getCurrentDate().split('/').join('')
    return password === currentPassword
}

export const createToken = () => {
    const currentPassword = getCurrentDate().split('/').join('')
    return `${currentPassword}${process.env.TOKEN}`
}

export const validateToken = (token: string) => {
    const currentToken = createToken()
    return token === currentToken
}