import { ControllerType  } from "../../TimeSheetAppTypes";
export interface IExpressControllerProvider {
    getHandlerFunction(controllerName: ControllerType, controllerMethod?: string): (req: object, res: object, next: object) => {};
    getGuardedHandlerFunction(controllerName: ControllerType, controllerMethod?: string):
      (req: object, res: object, next: object) => {};
}