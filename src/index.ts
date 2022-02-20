import "reflect-metadata";
import { Container } from 'inversify';
import { DbConnector } from "./db/DbConnector";
import { DbConfig } from "./config/db/DbConfig";
import { ConnectionConfigFactory } from "./db/ConnectionConfig";
import { AppConfig } from "./config/AppConfig";
import { Runtime } from './Runtime';
import { bootstrap } from "./Bootstrap";

console.log('index');
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

//createConnection().then(async connection => {

    // create express app
  //  const app = express();
    //app.use(bodyParser.json());

    // register express routes from defined application routes
    /*
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    */

    // setup express app here
    // ...

    // start express server
    //app.listen(3000);

    // insert new users for test
    /*
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));
    */

    //console.log("Express server has started on port 3000");

//}).catch(error => console.log(error));
