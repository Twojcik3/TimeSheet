import { Container } from "inversify";
import { AppConfig } from "../config/AppConfig";
import { IUserHandler } from "../service/user/IUserHandler";
import { IUserService } from "../service/user/IUserService";
import { UserService } from "../service/user/UserService";
import { UserHandler } from "../service/user/UserHandler";
import { TIME_SHEET_APP_TYPES } from "../TimeSheetAppTypes";
import { ITimeSheetService } from "../service/timeSheet/ITimeSheetService";
import { TimeSheetService } from "../service/timeSheet/TimeSheetService";
import { ITimeSheetHandler } from "../service/timeSheet/ITimeSheetHandler";
import { TimeSheetHandler } from "../service/timeSheet/TimeSheetHandler";

export async function bootstrapServices(appConfig: AppConfig, container: Container): Promise<void> {
    container.bind<IUserHandler>(TIME_SHEET_APP_TYPES.Service.User.Handler).to(UserHandler);
    container.bind<IUserService>(TIME_SHEET_APP_TYPES.Service.User.Service).to(UserService);
    container.bind<ITimeSheetService>(TIME_SHEET_APP_TYPES.Service.TimeSheet.Service).to(TimeSheetService);
    container.bind<ITimeSheetHandler>(TIME_SHEET_APP_TYPES.Service.TimeSheet.Handler).to(TimeSheetHandler);
}