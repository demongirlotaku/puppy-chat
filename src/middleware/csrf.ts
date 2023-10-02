var Tokens = require("csrf")
import settings from "@src/settings"
import { Request, Response } from "express"
import { log } from "@utils/logger"


const secret = settings.SECRET?.slice(0, 18)

const CSRFWorker = Tokens({
    saltLength: settings.CSRF.salt_len,
    validity: settings.CSRF.validity
})

/**
 * Enforce csrf token cookie
 */
const enforceCSRF = (req: Request, res: Response): Request => {
    const token = CSRFWorker.create(secret)

    return req.cookies("csrf", token)
}


/**
 * Verify csrf token from request
 */
const verifyCSRF = (req: Request, res: Response) => {
    const token = req.cookies.csrf

    if (!CSRFWorker.verify(secret, token)) {
        log.info("403 Forbiden request")
        return res.status(403).send("Forbinden request")
    }
}


const CSRFMiddleware = {
    enforceCSRF,
    verifyCSRF
}

export default CSRFMiddleware