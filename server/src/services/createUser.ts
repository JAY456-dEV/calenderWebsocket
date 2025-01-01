import prisma from "../lib/prismaclient"

async function createUser({ username, email, password }: { username: string, email: string, password: string }) {
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        })
        return newUser
    } catch (error) {
        throw new Error('error to craeteUser choose another email')
    }

}

export default createUser