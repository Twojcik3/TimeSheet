import { Container } from "inversify";
import { bootstrapHttp } from "./bootstrap/bootstrapHttp";
import { AppConfig } from "./config/AppConfig";
import { TIME_SHEET_APP_TYPES } from "./TimeSheetAppTypes";
import { bootstrapRepositories } from './bootstrap/bootstrapRepositories';
import { bootstrapServices } from './bootstrap/bootstrapServices';
import { bootstrapValidators } from "./bootstrap/bootstrapValidators";

export async function bootstrap(appConfig: AppConfig, container: Container): Promise<void> {
    container.bind(TIME_SHEET_APP_TYPES.Config).toConstantValue(appConfig);
    bootstrapRepositories(container);
    await bootstrapServices(appConfig, container);
    await bootstrapHttp(container);
    bootstrapValidators(container);
    return;
}