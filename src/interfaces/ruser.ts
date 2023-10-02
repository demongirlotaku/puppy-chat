export default interface IRUser {
    uid: string,
    email: string,
    name: string,
    avatar?: string,
    createdAt?: Date,
    updatedAt?: Date
    chatRooms?: Array<string>
    friends?: Array<string>
}