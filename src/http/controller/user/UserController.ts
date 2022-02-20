import { Request, Response } from 'express-serve-static-core';
import { inject } from 'inversify';
import { AbstractBaseController } from '../AbstractBaseController';
import { TIME_SHEET_APP_TYPES } from '../../../TimeSheetAppTypes';
import { IUserHandler } from '../../../service/user/IUserHandler';
import { IValidationType } from '../../enum/IValidationType';
import { VALIDATOR_TYPES } from '../../enum/ValidatorsTypes';

export class UserController extends AbstractBaseController {
    constructor (
        @inject(TIME_SHEET_APP_TYPES.Service.User.Handler) private userHandler: IUserHandler,
        @inject(TIME_SHEET_APP_TYPES.Service.ValidationServiceFactory) protected validationServiceFactory:
        <T>(validationType: IValidationType<T>) => { validate(obj: unknown): Promise<T> }
    ){
        super();
    }
   public async startNewTime(req: Request, res: Response): Promise<void> {
       try {
           const requestValidator = this.validationServiceFactory(VALIDATOR_TYPES.UserController.StartNewTime);
           const setStartTimeInput = await requestValidator.validate({ ...req.params});
           await this.userHandler.setStartNewTime(setStartTimeInput);
           res.send(200, {
               message: 'start Time has been added',
           });
       } catch (err) {
           res.status(400).send('Error');
       }
   }

   public async setEndTime(req: Request, res: Response): Promise<void> {
       try {
            const requestValidator = this.validationServiceFactory(VALIDATOR_TYPES.UserController.SetEndTime);
            const setEndTimeInput = await requestValidator.validate({ ...req.params});
            await this.userHandler.setEndTimeOnActivity(setEndTimeInput);
            res.status(200).send('EndTime has been setted')
       } catch (err) {
           res.status(400).send('Error');
       }
   }
}
