import express from "express"
import type { Request, Response } from "express"
import settings from "@src/settings"
import { connectPSQL } from "@src/databases/postgres-db"
import { log } from "./utils/logger"
import RUser from "./models/ruser"
import Friend from "./models/friend"
import ChatRoom from "./models/chatroom"
import cors from "cors"
import cookieParser from "cookie-parser"
import RUserRouter from "./routes/ruser"
import ChatRoomRouter from "./routes/chatroom"
import FriendRouter from "./routes/friend"
import AuthRouter from "./routes/auth"


const app = express()

/**
 * Database connection
 */
connectPSQL()
RUser.sync({force: true, alter: true})
Friend.sync({force: true, alter: true})
ChatRoom.sync({force: true, alter: true})


/**
 * Server configurations
 */
app.use(cors())
app.use(cookieParser())


/**
 * Routes setup
 */
app.use("/rusers", RUserRouter)
app.use("/chatrooms", ChatRoomRouter)
app.use("/friends", FriendRouter)
app.use("/auth", AuthRouter)


/**
 * App run
 */
app.get("/", (req: Request, res: Response) => {
    res.send("Initiated Puppy Chat server")
    
})

app.listen(8000, () => {
    log.info(`Running server at http://${settings.HOST}:${settings.PORT}`)
})