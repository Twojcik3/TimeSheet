import { Container } from 'inversify';
import { TIME_SHEET_APP_TYPES } from '../TimeSheetAppTypes';
import { ExpressRoutesManager } from '../service/router/ExpressRoutesManager'
import { ExpressControllerProvider } from '../service/http/ExpressControllerProvider';
import { ControllerType, MiddlewareType } from '../TimeSheetAppTypes'
import { UserController } from '../http/controller/user/UserController';
import { TimeSheetController } from '../http/controller/timeSheet/TimeSheetController'

async function bootstrapControllers(container: Container): Promise<void> {
    container.bind(TIME_SHEET_APP_TYPES.Http.Service.ControllerProvider).to(ExpressControllerProvider);
    container.bind(TIME_SHEET_APP_TYPES.Http.Controller.UserController).to(UserController).inRequestScope();
    container.bind(TIME_SHEET_APP_TYPES.Http.Controller.TimeSheetController).to(TimeSheetController).inRequestScope();
    container.bind(TIME_SHEET_APP_TYPES.Http.Service.ControllerFactory).toFactory((ctx) =>
        (controllerType: ControllerType): any => {
            if (ctx.container.isBound(controllerType)) {
                return ctx.container.get(controllerType);
            }
            return null;
        },
    );
}

async function bootstrapMiddlewares(container: Container): Promise<void> {
    return;
}

export async function bootstrapHttp(container: Container): Promise<void> {
    await Promise.all([
        bootstrapControllers(container),
        bootstrapMiddlewares(container)
    ]);
    container.bind(TIME_SHEET_APP_TYPES.Http.Routes.RoutesManager).to(ExpressRoutesManager);
}