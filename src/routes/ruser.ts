import { Request, Response } from "express"
import { Router } from "express"
import RUserServices from "@src/services/ruser"
import IRUser from "@src/interfaces/ruser"


const RUserRouter = Router()

/**
 * GET ruser
 */
 RUserRouter.get("/", async (req: Request, res: Response) => {
    await RUserServices.findAllRUser()
    .then((rusers) => {
        res.status(200).json(rusers)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})


/**
 * GET ruser/:uid
 */
 RUserRouter.get("/:uid", async (req: Request, res: Response) => {
    const uid = req.params.uid

    await RUserServices.findRUser(uid)
    .then((ruser) => {
        res.status(200).json(ruser)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})


/**
 * POST ruser
 */
 RUserRouter.post("/", async (req: Request, res: Response) => {
    const newRUser: IRUser = req.body

    await RUserServices.createRUser(newRUser)
    .then((ruser) => {
        res.status(200).json(ruser)
    })
    .catch((e) => {
        res.status(500).json(e.message)
    })
})


/**
 * PUT ruser
 */
 RUserRouter.put("/", async (req: Request, res: Response) => {
    const updatedRUser = req.body

    await RUserServices.updateRUser(updatedRUser)
    .then((ruser) => {
        res.status(200).json(ruser)
    })
    .catch((e) => {
        res.status(500).json(e.message)
    })
})


/**
 * DELETE ruser/:uid
 */
 RUserRouter.get("/:uid", async (req: Request, res: Response) => {
    const uid = req.params.uid

    await RUserServices.destroyRUser(uid)
    .then((ruser) => {
        res.status(200).json(ruser)
    })
    .catch((e) => {
        res.status(500).send(e.message)
    })
})

export default RUserRouter


