import { IValidationType } from "./IValidationType";
import { ISetStartTime } from "../controller/user/input/ISetStartTime";
import { IGetStatisticsInput } from "../controller/timeSheet/input/IGetStatisticsInput";
import { ISetEndTime } from "../controller/user/input/ISetEndTime";

export const VALIDATOR_TYPES = {
    UserController: {
        StartNewTime: {} as IValidationType<ISetStartTime>,
        SetEndTime: {} as IValidationType<ISetEndTime>
    },
    TimeSheetController: {
        GetStatistics: {} as IValidationType<IGetStatisticsInput>
    }
}