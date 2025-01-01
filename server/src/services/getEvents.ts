import prisma from "../lib/prismaclient";

async function getEvents() {
    try {
        const event = await prisma.events.findMany()
        return event
    } catch (error) {
        throw new Error('error to create Event')
    }
}

export default getEvents