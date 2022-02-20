import { Container } from "inversify";
import { TIME_SHEET_APP_TYPES } from "../TimeSheetAppTypes";
import { IValidationType } from "../http/enum/IValidationType";
import * as yup from 'yup';
import { VALIDATOR_TYPES } from "../http/enum/ValidatorsTypes";
import { ISetStartTime } from "../http/controller/user/input/ISetStartTime";
import { IGetStatisticsInput } from "../http/controller/timeSheet/input/IGetStatisticsInput";
import { ISetEndTime } from "../http/controller/user/input/ISetEndTime";
import { string } from "yup/lib/locale";

export function bootstrapValidators(container: Container): void {
    container.bind(TIME_SHEET_APP_TYPES.Service.ValidationServiceFactory).toFactory(() => 
    <T>(validationType: IValidationType<T>): { validate(obj: unknown): Promise<unknown> } => {
        switch(validationType) {
            case VALIDATOR_TYPES.UserController.StartNewTime: {
                const schema = yup.object( {
                    id: yup.string().required(),
                    description: yup.string().required(),
                    startTime: yup.date().required(),
                });
                return {
                    async validate(obj: unknown): Promise<ISetStartTime> {
                        return schema.validate(obj, { abortEarly: false});
                    },
                };
            }

            case VALIDATOR_TYPES.TimeSheetController.GetStatistics: {
                const schema = yup.object({
                    id: yup.string()
                });
                return {
                    async validate(obj: unknown): Promise<IGetStatisticsInput> {
                        return schema.validate(obj, { abortEarly: false})
                    }
                }
            }

            case VALIDATOR_TYPES.UserController.SetEndTime: {
                const schema = yup.object({
                    userId: yup.string().required(),
                    activityId: yup.string().required(),
                    endTime: yup.date().required()
                });
                return {
                    async validate(obj: unknown): Promise<ISetEndTime> {
                        return schema.validate(obj, { abortEarly: false})
                    }
                }
            }
            default:
                  throw new Error('no such validation type');
        }
    })
}