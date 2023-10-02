import RUser from "@src/models/ruser";
import IRUser from "@src/interfaces/ruser";


/**
 * GET all RUser instances
 */
 const findAllRUser = async (): Promise<IRUser[]> => {
    return RUser.findAll({
        order: ["createdAt", "DESC"]
    })
}


/**
 * GET RUser instance by id
 */
const findRUser = async (uid: string): Promise<IRUser> => {
    const user = await RUser.findByPk(uid)

    if (!user) throw Error("user does not exist in the relational database")

    return user
}


/**
 * POST a new RUser instance
 */
const createRUser = async (newRUser: IRUser): Promise<IRUser> => {
    const user = RUser.build(newRUser)
    return await user.save()
}


/**
 * PUT a RUser instance
 */
const updateRUser = async (updatedRUser: IRUser): Promise<IRUser> => {
    const user = await RUser.findByPk(updatedRUser.uid)

    if (!user) {
        throw Error("user does not exist in the relational database")
    }

    user.set(updatedRUser)
    return await user.save()
}


/**
 * DEconstE a RUser instance
 */
const destroyRUser = async (uid: string): Promise<void> => {
    const user = await RUser.findByPk(uid)

    if (!user) {
        throw Error("user does not exist the relational database")
    }

    await user.destroy()
}


const RUserServices =  { 
    findRUser, 
    findAllRUser, 
    createRUser, 
    updateRUser, 
    destroyRUser 
}

export default RUserServices