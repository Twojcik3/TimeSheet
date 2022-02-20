import { IUserHandler } from "./IUserHandler";
import { inject, injectable } from 'inversify';
import { TIME_SHEET_APP_TYPES } from "../../TimeSheetAppTypes";
import { IUserService } from './IUserService';
import { ISetStartTime } from "../../http/controller/user/input/ISetStartTime";
import { UserDoesNotExistError } from "../../error/UserDoesNotExistError";
import { ITimeSheetService } from "../timeSheet/ITimeSheetService";
import { AlreadyLoggedError } from "../../error/AlreadyLoggedError";
import { ActivityIsFinishedError } from "../../error/ActivityIsFinishedError";
import { ActivityDoesNotExistError } from "../../error/ActivityDoesNotExistError";
import { ISetEndTime } from "../../http/controller/user/input/ISetEndTime";
import { InvalidEndTimeError } from "../../error/InvalidEndTimeError";

@injectable()
export class UserHandler implements IUserHandler {
    constructor(
        @inject(TIME_SHEET_APP_TYPES.Service.User.Service) private userService: IUserService,
        @inject(TIME_SHEET_APP_TYPES.Service.TimeSheet.Service) private timeSheetService: ITimeSheetService
    ){}
    public async setStartNewTime(setStartTimeInput: ISetStartTime): Promise<void> {
        const user = await this.userService.getUserById(setStartTimeInput.id);
        if(!user){
            throw new UserDoesNotExistError('User does not exsist');
        }        
        const timeSheet = await this.timeSheetService.getLastActivity(setStartTimeInput.id);
        if(timeSheet && timeSheet.endTime === null) {
            throw new AlreadyLoggedError('Previous activity has not been ended');
        }
        if(!timeSheet || timeSheet.endTime !== null) {
            return await this.timeSheetService.setNewStartTIme(setStartTimeInput);
        }
        
    }

    public async setEndTimeOnActivity(setEndTimeOnActivityInput: ISetEndTime): Promise<void> {
        const user = await this.userService.getUserById(setEndTimeOnActivityInput.userId);
        if (!user){
            throw new UserDoesNotExistError('User does not exsist');
        } 
        const timeSheet = await this.timeSheetService.getById(setEndTimeOnActivityInput.activityId);
        if (!timeSheet) {
            throw new ActivityDoesNotExistError('Activity does not exist');
        }
        if (timeSheet && timeSheet.endTime !== null) {
            throw new ActivityIsFinishedError('Activity is already finished');
        }
        if (timeSheet && timeSheet.startTime < setEndTimeOnActivityInput.endTime) {
            throw new InvalidEndTimeError('Invalid end Time');
        }
        return await this.timeSheetService.setEndTime(setEndTimeOnActivityInput);
    }
}