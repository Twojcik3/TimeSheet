import { Container } from "inversify";
import { TIME_SHEET_APP_TYPES } from "../TimeSheetAppTypes";
import { PostgreSQLUserRepository } from "../repository/user/PostgreSQLUserRepository";
import { getCustomRepository } from 'typeorm';
import { PostgreSQLTimeSheetRepository } from "../repository/timeSheet/PostgreSQLTimeSheetRepository";

export function bootstrapRepositories(container: Container): void {
    container.bind(TIME_SHEET_APP_TYPES.Repository.UserRepository).toConstantValue(getCustomRepository(PostgreSQLUserRepository));
    container.bind(TIME_SHEET_APP_TYPES.Repository.TimeSheetRepository).toConstantValue(getCustomRepository(PostgreSQLTimeSheetRepository));
}