import { TimeSheetLog } from "../../db/entity/TimeSheetLog";
import { ITimeSheetService } from "./ITimeSheetService";
import { ITimeSheetRepository } from "../../repository/timeSheet/ITimeSheetRepository";
import { inject, injectable } from "inversify";
import { TIME_SHEET_APP_TYPES } from "../../TimeSheetAppTypes";
import { IGetStatisticsOutput } from "../../http/controller/timeSheet/output/IGetStatisticOutput";
import { ISetStartTime } from "../../http/controller/user/input/ISetStartTime";
import { ISetEndTime } from "../../http/controller/user/input/ISetEndTime";

@injectable()
export class TimeSheetService implements ITimeSheetService {
    constructor(
        @inject(TIME_SHEET_APP_TYPES.Repository.TimeSheetRepository) private timeSheetRepository: ITimeSheetRepository
    ) {}

    public async getLastActivity(userId: string): Promise<TimeSheetLog> {
        const timeSheet = await this.timeSheetRepository.getLastActivityForUser(userId, 'acitivtyId: string');
        return timeSheet;
    }

    public async getById(id: string): Promise<TimeSheetLog> {
        return this.timeSheetRepository.getById(id);
    }

    public getStatistics(userId?: string): Promise<IGetStatisticsOutput[]> {
        return this.timeSheetRepository.getStatistic(userId);
    }

    public async setNewStartTIme(setStartTimeInput: ISetStartTime): Promise<void> {
        return await this.timeSheetRepository.setStartTime(setStartTimeInput);
    }

    public async setEndTime(setEndTimeInput: ISetEndTime): Promise<void> {
        return await this.timeSheetRepository.setEndTime(setEndTimeInput);
    }
}