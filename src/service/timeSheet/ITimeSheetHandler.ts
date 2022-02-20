import { IGetStatisticsOutput } from "../../http/controller/timeSheet/output/IGetStatisticOutput";
export interface ITimeSheetHandler {
    getStatistics(userId?: string): Promise<IGetStatisticsOutput[]>;
}