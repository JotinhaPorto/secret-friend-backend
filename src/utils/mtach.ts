import bcrypt from "bcrypt";

export const encryptMatch = async (id: string) => {
    return await bcrypt.hash(id, 10)
}

// export const decryptMatch = async (match: string): number => {
//     return await bcrypt.compare(match,???)
// }