import { TimeSheetLog } from "../../db/entity/TimeSheetLog";
import { IGetStatisticsOutput } from "../../http/controller/timeSheet/output/IGetStatisticOutput";
import { ISetStartTime } from "../../http/controller/user/input/ISetStartTime";
import { ISetEndTime } from "../../http/controller/user/input/ISetEndTime";
export interface ITimeSheetService {
    getLastActivity(userId: string): Promise<TimeSheetLog>;
    getById(id: string): Promise<TimeSheetLog>;
    getStatistics(userId?: string): Promise<IGetStatisticsOutput[]>;
    setNewStartTIme(setStartTimeInput: ISetStartTime): Promise<void>;
    setEndTime(setEndTimeInput: ISetEndTime): Promise<void>;
}