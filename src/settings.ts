import * as dotenv from "dotenv"
import type { Options, Sequelize } from "sequelize"
import { log } from "./utils/logger"

dotenv.config()

export const HOST = process.env.HOST
export const PORT = process.env.PORT
export const SECRET = process.env.SECRET

export const CSRF = {
    salt_len: 11,
    validity: 500
}

export const SESSION = {
    expiresIn: 60 * 60 * 24  * 1000
}

export const COOKIE = {
    maxAge: 60 * 60 * 24 * 5 * 1000,
    httpOnly: true,
    secure: true
}

export const FIREBASE = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID 
}

interface RDS {
    options: Options
}

export const PSQL: RDS = {
    options: {
        dialect: "postgres",
        host: process.env.PSQL_HOST,
        port: parseInt(process.env.PSQL_PORT as string),
        database: process.env.PSQL_DB,
        username: process.env.PSQL_USER,
        password: process.env.PSQL_PASSWORD,
        logging: message => log.debug(message),
        pool: {
            max: 50,
            min: 0,
            acquire: 10000,
            idle: 500
        }
    }
}


const settings = {
    HOST,
    PORT,
    CSRF,
    SECRET,
    SESSION,
    COOKIE,
    FIREBASE,
    PSQL
}

export default settings