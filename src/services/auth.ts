import { fbAuth } from "@src/databases/firebase-db"
import { Request, Response } from "express"
import { COOKIE, SESSION } from "@src/settings"


const sessionLogin = async (req: Request, res: Response) => {
  const idToken = req.body.idToken.toString();
  const csrfToken = req.body.csrfToken.toString();
  if (csrfToken !== req.cookies.csrfToken) {
    res.status(401).send("Unauthorized request");
    return;
  }
  fbAuth
    .createSessionCookie(idToken, { expiresIn: SESSION.expiresIn })
    .then(
      (sessionCookie) => {
        const cookieOptions = COOKIE
        res.cookie("session", sessionCookie, cookieOptions);
        res.end(JSON.stringify({ status: 'success' }));
      },
      (error) => {
        res.status(401).send("Unauthorized request");
      }
    );
}


const sessionLogout = async (req: Request, res: Response) => {
    const sessionCookie = req.cookies.session || '';
    res.clearCookie("session");
    fbAuth
      .verifySessionCookie(sessionCookie)
      .then((decodedClaims) => {
        return fbAuth.revokeRefreshTokens(decodedClaims.sub);
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((error) => {
        res.redirect("/login");
      });
}


const verifySession = (req: Request, res: Response) => {
    const sessionCookie = req.cookies.session || "";
    fbAuth
      .verifySessionCookie(sessionCookie, true)
      .then((decodedClaims) => {

      })
      .catch((error) => {
        res.redirect("/login");
      });
}


const AuthServices = {
  sessionLogin,
  sessionLogout,
  verifySession
}

export default AuthServices