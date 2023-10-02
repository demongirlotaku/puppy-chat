import { Request, Response } from "express";
import { Router } from "express";
import AuthServices from "@src/services/auth";


const AuthRouter = Router()

/**
 * POST auth/login
 */
AuthRouter.post("/login", async (req: Request, res: Response) => {

})


/**
 * POST auth/logout
 */
 AuthRouter.post("/logout", async (req: Request, res: Response) => {

})


/**
 * GET auth/verify
 */
 AuthRouter.post("/verify", async (req: Request, res: Response) => {

})

export default AuthRouter


