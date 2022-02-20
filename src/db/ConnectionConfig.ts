import { DbConfig } from "../config/db/dbConfig";
import { User } from "./entity/User";
import { TimeSheetLog } from "./entity/TimeSheetLog";
import { ConnectionOptions } from "typeorm";

export class ConnectionConfigFactory {
    private dbConfig: DbConfig

    constructor(dbConfig: DbConfig) {
        this.dbConfig = dbConfig;
    }

    public create(): ConnectionOptions {
        return {
            database: this.dbConfig.database,
            entities: [
                User,
                TimeSheetLog,
            ],
            host: this.dbConfig.host,
            password: this.dbConfig.password,
            port: this.dbConfig.port,
            type: 'postgres',
            username: this.dbConfig.userName,
            synchronize: false,
            logging: false,
        }
    }
}