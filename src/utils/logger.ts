import { createLogger } from "bunyan";
import { name, version } from "../../package.json"

const getLogger = (
    serviceName: string, 
    serviceVersion: string) => 
    createLogger({name: `${serviceName}:${serviceVersion}`})

export const log = getLogger(name, version)