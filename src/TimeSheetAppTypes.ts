export type ControllerType = symbol;
export type MiddlewareType = symbol;

export const TIME_SHEET_APP_TYPES = {
    Config: Symbol.for('AppConfig'),
    Http: {
        Controller: {
            UserController: Symbol.for('UserController'),
            TimeSheetController: Symbol.for('TimeSheetController'),
        },
        Middleware: {

        },
        Service: {
            ControllerFactory: Symbol.for('Factory<AbstractBaseController>'),
            ControllerProvider: Symbol.for('ControllerProvider'),
        },
        Routes: {
            RoutesManager: Symbol.for('RoutesManager'),
        },
    },
    Service: {
        User: {
            Service: Symbol.for('UserService'),
            Handler: Symbol.for('UserHandler'),
        },
        TimeSheet: {
            Service: Symbol.for('TimeSheetService'),
            Handler: Symbol.for('TimeSheetHandler'),
        },
        ValidationServiceFactory: Symbol.for('<Factory>ValidationService'),
    },
    Repository: {
        UserRepository: Symbol.for('UserRepository'),
        TimeSheetRepository: Symbol.for('TimeSheetRepostitory'),
    }
}