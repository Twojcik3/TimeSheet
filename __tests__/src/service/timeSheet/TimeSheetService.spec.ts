import 'jest';
import 'reflect-metadata';
import { TimeSheetLog } from '../../../../src/db/entity/TimeSheetLog';
import { TimeSheetService } from '../../../../src/service/timeSheet/TimeSheetService';
import { IGetStatisticsOutput } from '../../../../src/http/controller/timeSheet/output/IGetStatisticOutput';

const mockedTimeSheet = new TimeSheetLog();
const timeSheetRepositoryMock: any = jest.fn();
let timeSheetService: TimeSheetService;
const mockedStat1 = {} as IGetStatisticsOutput;
const mockedStat2 = {} as IGetStatisticsOutput;
const mockedStatistic = [] as IGetStatisticsOutput[];
describe('TimeSheet Service tests', () => {
    beforeEach(() => {
        timeSheetService = new TimeSheetService(
            timeSheetRepositoryMock
        )
    });

    it('should return timesheet by ID', async() => {
        const getTimeSheetInput: any = jest.fn();
        timeSheetRepositoryMock.getById = (): TimeSheetLog => new TimeSheetLog();
        const timesheet = await timeSheetService.getById(getTimeSheetInput);
        expect(timesheet).toBeInstanceOf(TimeSheetLog);
    })

    it('should return last timesheet for user', async() => {
        const getTimeSheetInput: any = jest.fn();
        timeSheetRepositoryMock.getLastActivityForUser = (): TimeSheetLog => new TimeSheetLog();
        const timesheet = await timeSheetService.getById(getTimeSheetInput);
        expect(timesheet).toBeInstanceOf(TimeSheetLog);
    })

    it('should return statistic', async() => {
        const getStatisticInput: any = jest.fn();
        timeSheetRepositoryMock.getStatistic = (): IGetStatisticsOutput[] => [mockedStat1, mockedStat2];
        const statistics = await timeSheetService.getStatistics(getStatisticInput);
        expect(statistics.length).toBeGreaterThan(1);
    })
})