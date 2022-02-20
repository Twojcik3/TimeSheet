import 'jest';
import 'reflect-metadata';
import *  as httpMocks from 'node-mocks-http';
import { TimeSheetController } from '../../../../src/http/controller/timeSheet/TimeSheetController';

const timeSheetHandler: any = jest.fn();
let validatorFactoryMock: any = jest.fn();
let res: any;
let req: any;
let timeSheetController: TimeSheetController;
const mockedStat1 = {
    id: '',
};
const mockedStat2 = {
    id: '',
};

describe('TimeSheetController tests', () => {
    beforeEach(() => {
        res = httpMocks.createResponse();
        req = httpMocks.createRequest();
    });

    it('should return statistics', async () => {
        validatorFactoryMock = () => ({
            validate: () => ({}),
        });
        timeSheetHandler.getStatistics = ()=> [mockedStat1, mockedStat2];
        timeSheetController = new TimeSheetController(
            timeSheetHandler,
            validatorFactoryMock
        );

        await timeSheetController.getStatistics(req, res);
        expect(res.statusCode).toEqual(200);
    });

    it('should return 400 when get statistic input is not valid', async () => {
        validatorFactoryMock = () => ({
            validate: () => { throw new Error(); },
        });
        timeSheetHandler.getStatistics = ()=> [mockedStat1, mockedStat2];
        timeSheetController = new TimeSheetController(
            timeSheetHandler,
            validatorFactoryMock
        );

        await timeSheetController.getStatistics(req, res);
        expect(res.statusCode).toEqual(400);
    });

})