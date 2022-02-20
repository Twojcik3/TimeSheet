import { inject, injectable } from "inversify";
import { ITimeSheetHandler } from "./ITimeSheetHandler";
import { ITimeSheetService } from "./ITimeSheetService";
import { TIME_SHEET_APP_TYPES } from "../../TimeSheetAppTypes";
import { IGetStatisticsOutput } from "../../http/controller/timeSheet/output/IGetStatisticOutput";

@injectable()
export class TimeSheetHandler implements ITimeSheetHandler {
    constructor(
        @inject(TIME_SHEET_APP_TYPES.Service.TimeSheet.Service) private timeSheetService: ITimeSheetService
    ){}
    
    public async getStatistics(userId?: string): Promise<IGetStatisticsOutput[]> {
        const statistics = await this.timeSheetService.getStatistics(userId);
        return statistics;
    }
}