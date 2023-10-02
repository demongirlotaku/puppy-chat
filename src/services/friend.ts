import IFriend from "@src/interfaces/friend";
import RUser from "@src/models/ruser";
import Friend from "@src/models/friend";


/**
 * GET all Friend instances
 */
 const findAllFriends = async (): Promise<Friend[]> => {
    return Friend.findAll({
        order: ["createdAt", "DESC"]
    })
}


/**
 * GET all Friend instances of a RUser instance
 */
const findFriendsOfRUser = async (
    userId: string
    ): Promise<Friend[]> => {

    const user = RUser.findByPk(userId)

    if (!user) throw Error("user with id does not exist")

    return Friend.findAll({
        where: {
            userId: userId
        }
    })
}


/**
 * POST a new friend instance
 */
const createFriend = async (
    newFriend: IFriend
    ): Promise<Friend> => {

    const friend = Friend.build(newFriend)
    return await friend.save()
}


/**
 * DEconstE a Friend instance by userId and friendId
 */
const destroyFriend = async (
    userId: string, 
    friendId: string
    ): Promise<void> => {

    const friend = await Friend.findOne({
        where: {
            userId: userId,
            friendId: friendId
        }
    })

    if (!friend) {
        throw Error("the friend relation does not exist")
    }

    await friend.destroy()
}

/**
 * GET RUser instances who are friend of an user
 */
const findFriendedRUsers = async (
    userId: string
    ): Promise<RUser[]> => {

    const friends = await findFriendsOfRUser(userId)

    return RUser.findAll({
        where: {
            uid: friends.map((friend) => friend.friendId)
        }
    })
}


const FriendServices = { 
    findAllFriends, 
    findFriendsOfRUser, 
    findFriendedRUsers, 
    createFriend, 
    destroyFriend
}

export default FriendServices