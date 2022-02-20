import { Request, Response } from 'express-serve-static-core';
import { inject } from 'inversify';
import { AbstractBaseController } from '../AbstractBaseController';
import { TIME_SHEET_APP_TYPES } from '../../../TimeSheetAppTypes';
import { ITimeSheetHandler } from '../../../service/timeSheet/ITimeSheetHandler';
import { VALIDATOR_TYPES } from '../../enum/ValidatorsTypes';
import { IValidationType } from '../../enum/IValidationType';

export class TimeSheetController extends AbstractBaseController {
    constructor (
        @inject(TIME_SHEET_APP_TYPES.Service.TimeSheet.Handler) private timeSheetHandler: ITimeSheetHandler,
        @inject(TIME_SHEET_APP_TYPES.Service.ValidationServiceFactory) protected validationServiceFactory:
        <T>(validationType: IValidationType<T>) => { validate(obj: unknown): Promise<T> }
    ){
        super();
    }

    public async getStatistics(req: Request, res: Response): Promise<void> {
        try {
            const requestValidator = this.validationServiceFactory(VALIDATOR_TYPES.TimeSheetController.GetStatistics);
           const getStatisticInput = await requestValidator.validate({ id: req.params.userId});
           const statistics = await this.timeSheetHandler.getStatistics(getStatisticInput.id);
           res.status(200).send(statistics);
        } catch (err) {
            res.status(400).send(err);
        }
    }
}