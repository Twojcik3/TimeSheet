import "reflect-metadata";
import { Container } from 'inversify';
import { DbConnector } from "./db/DbConnector";
import { DbConfig } from "./config/db/DbConfig";
import { ConnectionConfigFactory } from "./db/ConnectionConfig";
import { AppConfig } from "./config/AppConfig";
import { Runtime } from './Runtime';
import { bootstrap } from "./Bootstrap";

const dbConfigObject = {
    driver: 'driver',
    host: 'localhost',
    port: 5432,
    userName: 'postgres',
    password: 'dev',
    logging: false,
    database: 'postgres',
};
const appConfigObject = {
    port: 3000,
    endpoint: 'http://127.0.0.1:3000/',
    ...dbConfigObject,
};
(async (): Promise<void> => {
    console.log('Start');
    const dbConfig = new DbConfig();
    dbConfig.deserialize(dbConfigObject);
    const appConfig = new AppConfig();
    appConfig.deserialize(appConfigObject);
    const container = new Container();
    const connectionConfigFactory = new ConnectionConfigFactory(dbConfig);
    try {
        const dbConnector = new DbConnector();
        await dbConnector.connect(dbConfig, connectionConfigFactory);
        await bootstrap(appConfig, container);
        const runtime = new Runtime(container);
        runtime.startHttpServer(appConfig);

    } catch (err) {
        console.log(`Cannot run server ${err}`);
    }
})();
