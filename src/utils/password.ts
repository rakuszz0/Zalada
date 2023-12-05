import * as bcrypt from "bcrypt"


type CheckPasswordPayload = { hash: string, password: string }

export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

export async function checkPassword({ hash, password }: CheckPasswordPayload) {
    return bcrypt.compareSync(password, hash)
}