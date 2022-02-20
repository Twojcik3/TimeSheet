import { ISetStartTime } from "../../http/controller/user/input/ISetStartTime";
import { ISetEndTime } from "../../http/controller/user/input/ISetEndTime";

export interface IUserHandler {
    setStartNewTime(setStartTimeInput: ISetStartTime): Promise<void>;
    setEndTimeOnActivity(setEndTimeOnActivity: ISetEndTime): Promise<void>;
}