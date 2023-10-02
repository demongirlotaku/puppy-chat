import RUser from "@interfaces/ruser"

export default interface IChatRoom {
    id: string,
    name?: string,
    msgIds: Array<string>
    createdAt?: Date
    users: RUser
}