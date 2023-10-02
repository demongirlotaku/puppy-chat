export default interface Message {
    uid: string
    roomId: string,
    content: string,
    isSeen: boolean,
    createdAt?: Date,
    updatedAt?: Date
}