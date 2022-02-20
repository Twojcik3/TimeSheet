import 'jest';
import 'reflect-metadata';
import { UserService} from '../../../../src/service/user/UserService';
import { UserHandler } from '../../../../src/service/user/UserHandler';
import { User } from '../../../../src/db/entity/User';
import { ISetStartTime } from '../../../../src/http/controller/user/input/ISetStartTime';
import { ISetEndTime } from '../../../../src/http/controller/user/input/ISetEndTime';
import { TimeSheetLog } from '../../../../src/db/entity/TimeSheetLog';
const mockedUserService: any = jest.fn();
const timeSheetService: any = jest.fn();
const mockedTimeSheetService: any = jest.fn();
const mockedSetStart = {} as ISetStartTime;
const mockedSetEndTime = {} as ISetEndTime;
const mockedTimsheet = {
    endTime: null,
} as TimeSheetLog;

let userHandler: UserHandler;
describe('User Handler tests', () => {
    beforeEach(() => {
        userHandler = new UserHandler (
            mockedUserService,
            mockedTimeSheetService
        )
    });

    it('should not setStartTime when user not exists', async () => {
        //
        mockedUserService.getUserById = () => null;
        expect.assertions(1);
        try {
            await userHandler.setStartNewTime(mockedSetStart);
        } catch (err) {
            expect(err.constructor).toBe(Error);
        }
    })

    it('should not setStartTime when user not exists', async () => {
        //
        timeSheetService.getLastActivity = () => null;
        expect.assertions(1);
        try {
            await userHandler.setStartNewTime(mockedSetStart);
        } catch (err) {
            expect(err.constructor).toBe(Error);
        }
    });

    it('should not setEndTime when user does not exist', async () => {
        mockedUserService.getUserById = () => null;
        expect.assertions(1);
        try {
            await userHandler.setEndTimeOnActivity(mockedSetEndTime);
        } catch (err) {
            expect(err.constructor).toBe(Error);
        }
    });

    it('should not setEndTime when activity does not exist', async () => {
        mockedTimeSheetService.getById = () => null;
        expect.assertions(1);
        try {
            await userHandler.setEndTimeOnActivity(mockedSetEndTime);
        } catch (err) {
            expect(err.constructor).toBe(Error);
        }
    });
})