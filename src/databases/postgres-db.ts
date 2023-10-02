import { log } from "@src/utils/logger";
import settings from "@src/settings"
import { Sequelize } from "sequelize";

const psqlSequelize = new Sequelize(settings.PSQL.options)

const connectPSQL = async () => {
    await psqlSequelize.authenticate()
    .then(() => log.info("Connected to PostgreSQL database"))
    .catch((error) => {
        log.error("Failed to connect PostgresSQL database", error)
        process.exit(1)
    })
}


export { connectPSQL, psqlSequelize }