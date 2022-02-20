import { TimeSheetLog } from "../../db/entity/TimeSheetLog";
import { IGetStatisticsOutput } from "../../http/controller/timeSheet/output/IGetStatisticOutput";
import { ISetStartTime } from "../../http/controller/user/input/ISetStartTime";
import { ISetEndTime } from "../../http/controller/user/input/ISetEndTime";

export interface ITimeSheetRepository {
    getLastActivityForUser(userId: string): Promise<TimeSheetLog>;
    getById(activityId: string): Promise<TimeSheetLog>;
    getStatistic(userId?: string): Promise<IGetStatisticsOutput[]>;
    setStartTime(setStartTimeInput: ISetStartTime): Promise<void>;
    setEndTime(setEndTimeInput: ISetEndTime): Promise<void>;
}