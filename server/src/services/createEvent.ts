import prisma from "../lib/prismaclient";

async function createEvent({ title, startDate, endDate }: { title: string, startDate: string, endDate: string }) {
    try {
        const event = await prisma.events.create({
            data: {
                eventName: title, startTime: startDate, endTime: endDate, userId: '6773cb4cc86bf4d5770ed4af'
            }
        })

        return event
    } catch (error) {
        throw new Error('error to create Event')
    }
}

export default createEvent