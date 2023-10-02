import { Request, Response } from "express"
import { Router } from "express"
import ChatRoomServices from "@src/services/chatroom"
import IChatRoom from "@src/interfaces/chatroom"


const ChatRoomRouter = Router()

/**
 * GET chatrooms
 */
ChatRoomRouter.get("/", async (req: Request, res: Response) => {
    await ChatRoomServices.findAllChatRooms()
    .then((chatrooms) => {
        res.status(200).json(chatrooms)
    }).catch((e) => {
        res.status(500).send(e.message)
    })
})


/**
 * GET chatrooms/:id
 */
ChatRoomRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id

    await ChatRoomServices.findChatRoom(id)
    .then((chatrooms) => {
        res.status(200).json(chatrooms)
    }).catch((e) => {
        res.status(500).send(e.message)
    })
})


/**
 * GET chatrooms/:uid
 */
ChatRoomRouter.get("/:uid", async (req: Request, res: Response) => {
    await ChatRoomServices.findAllChatRooms()
    .then((chatrooms) => {
        res.status(200).json(chatrooms)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})


/**
 * POST chatrooms
 */
ChatRoomRouter.post("/", async (req: Request, res: Response) => {
    const newChatRoom : IChatRoom = req.body

    await ChatRoomServices.createChatRoom(newChatRoom)
    .then((chatroom) => {
        res.status(201).json(chatroom)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})


/**
 * DELETE chatrooms/:id
 */
ChatRoomRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id

    await ChatRoomServices.destroyChatRoom(id)
    .then(() => {
        res.status(204)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})

export default ChatRoomRouter