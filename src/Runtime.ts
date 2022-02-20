import { Container } from 'inversify';
import * as express from "express";
import * as http from 'http';
import * as bodyParser from "body-parser";
import { IRoutesManager } from './service/router/IRoutesManager';
import { TIME_SHEET_APP_TYPES } from './TimeSheetAppTypes';
import { AppConfig } from './config/AppConfig';
import * as url from 'url';
import * as cors from 'cors';

export class Runtime {
    constructor (
        protected container: Container,
    ){}
    
    public startHttpServer(appConfig: AppConfig){
        console.log('RunTime, starting Http server');
        const app = express();
        app.use(cors({
            credentials: true,
            origin: true,
        }));    
        const routesManager = this.container.get<IRoutesManager>(TIME_SHEET_APP_TYPES.Http.Routes.RoutesManager);
        routesManager.register(app);
        const listenURL = url.parse(appConfig.endpoint);
        console.log(`Listenning ${listenURL.host}`)
        return http.createServer(app).listen(listenURL.port);
    }
}