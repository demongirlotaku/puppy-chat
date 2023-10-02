import { Request, Response } from "express"
import { Router } from "express"
import FriendServices from "@src/services/friend";
import IFriend from "@src/interfaces/friend";


const FriendRouter = Router()

/**
 * GET friends
 */
FriendRouter.get("/", async (req: Request, res: Response) => {
    await FriendServices.findAllFriends()
    .then((friends) =>{
        res.status(200).json(friends)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})


/**
 * GET friends/:userId
 */
FriendRouter.get("/", async (req: Request, res: Response) => {
    const userId = req.params.userId

    await FriendServices.findFriendsOfRUser(userId)
    .then((friends) => {
        res.status(200).json(friends)
    })
})


/**
 * GET friends/users/:userId
 */
FriendRouter.get("/users/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId

    await FriendServices.findFriendedRUsers(userId)
    .then((users) => [
        res.status(200).json(users)
    ])
    .catch((e) => {
        res.status(500).send(e.message)
})
})


/**
 * POST friends
 */
FriendRouter.post("/", async (req: Request, res: Response) => {
    const newFriend: IFriend = req.body

    await FriendServices.createFriend(newFriend)
    .then((friend) => {
        res.status(201)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})


/**
 * DELETE friends/:userId/:friendId
 */
FriendRouter.delete("/:userId/:friendId", async (req: Request, res: Response) => {
    const { userId, friendId } = req.params

    await FriendServices.destroyFriend(userId, friendId)
    .then(() => {
        res.status(204)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})


export default FriendRouter