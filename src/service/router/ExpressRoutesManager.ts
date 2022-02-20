import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { MiddlewareType, TIME_SHEET_APP_TYPES } from '../../TimeSheetAppTypes';
import { IRoutesManager } from './IRoutesManager';
import { IRouter, RequestHandler  } from 'express';
import {
    registerRoutes as registerAPIRoutes,
} from '../../routes/api';
import { IExpressControllerProvider } from '../http/IExpressControllerProvider';


export type MiddlewareFactory = (m: MiddlewareType) => (req: Request, res: Response, next: NextFunction) => void;


@injectable()
export class ExpressRoutesManager implements IRoutesManager {
    constructor(
       @inject(TIME_SHEET_APP_TYPES.Http.Service.ControllerProvider) protected controllerProvider: IExpressControllerProvider,
    ){}

    public async register(router: IRouter): Promise<void> {
        //router.use(bodyParser.urlencoded({extended: false}));
        //router.use(bodyParser.json() as RequestHandler));
        //router.use(express.urlencoded({extended: false}) as RequestHandler);
       // router.use(express.json() as RequestHandler);
       
        this.registerApiRoutes(router);
    }

    protected registerApiRoutes(router: IRouter): void {
        const apiRouter = registerAPIRoutes(express.Router(), this.controllerProvider);
        router.use('/api', apiRouter);
    }

    protected register404Route(router: IRouter): void {
        router.all('*', (req: Request, res: Response) => {
            console.log(`Not registered path called method`);
        });
    }
}