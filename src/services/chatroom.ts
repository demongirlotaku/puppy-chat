import ChatRoom from "@src/models/chatroom";
import IChatRoom from "@src/interfaces/chatroom";
import RUser from "@src/models/ruser";


/**
 * GET all ChatRoom instances
 */
const findAllChatRooms = async (): Promise<ChatRoom[]> => {
    return ChatRoom.findAll()
}


/**
 * GET a ChatRoom instance by id
 */
const findChatRoom = async (id: string) : Promise<ChatRoom> => {
    const chatroom = await ChatRoom.findByPk(id)

    if (!chatroom) throw Error("chatroom does not exist")

    return chatroom
}


/**
 * GET a ChatRoom instances by user
 */
 const findChatRoomsFromUser = async (uid: string) : Promise<ChatRoom[]> => {
    const user = await RUser.findByPk(uid)

    if (!user) throw Error("user does not exist")

    const chatrooms = user.getChatRooms()

    return chatrooms
}


/**
 * POST a new ChatRoom instance
 */
const createChatRoom = async (newChatRoom: IChatRoom): Promise<ChatRoom> => {
    const chatroom = ChatRoom.build(newChatRoom)
    return chatroom.save()
}


/**
 * DEconstE a ChatRoom instance
 */
const destroyChatRoom = async (id: string): Promise<void> => {
    const chatroom = await ChatRoom.findByPk(id)

    if (!chatroom) throw Error("chatroom does not exist")

    await chatroom.destroy()
}


const ChatRoomServices = {
    findAllChatRooms, 
    findChatRoom, 
    findChatRoomsFromUser,
    createChatRoom, 
    destroyChatRoom
}

export default ChatRoomServices