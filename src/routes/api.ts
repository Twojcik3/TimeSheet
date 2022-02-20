import {IRouter} from 'express-serve-static-core';
import {MiddlewareFactory} from '../service/router/ExpressRoutesManager';
import { TIME_SHEET_APP_TYPES } from '../TimeSheetAppTypes';
import { IExpressControllerProvider } from '../service/http/IExpressControllerProvider';

export function registerRoutes(router: IRouter, controllerProvider: IExpressControllerProvider): IRouter {
    registerUserRoutes(router, controllerProvider);
    return router;
}

export function registerUserRoutes(router: IRouter, controllerProvider: IExpressControllerProvider): void {
    router.post(
        '/user/:id/:description/:startTime/startNewTime',
        controllerProvider.getHandlerFunction(TIME_SHEET_APP_TYPES.Http.Controller.UserController,
            'startNewTime'),
    );
    router.patch(
        '/user/:userId/:activityId/:endTime/setEndTime',
        controllerProvider.getHandlerFunction(TIME_SHEET_APP_TYPES.Http.Controller.UserController,
            'setEndTime')
    );
    router.get(
        '/statistic/:userId?/getStatistics',
        controllerProvider.getHandlerFunction(TIME_SHEET_APP_TYPES.Http.Controller.TimeSheetController,
            'getStatistics')
    );
}