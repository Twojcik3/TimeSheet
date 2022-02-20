import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import { TimeSheetLog } from '../../db/entity/TimeSheetLog';
import { ITimeSheetRepository } from './ITimeSheetRepository';
import { IGetStatisticsOutput } from "../../http/controller/timeSheet/output/IGetStatisticOutput";
import { ISetStartTime } from '../../http/controller/user/input/ISetStartTime';
import { ISetEndTime } from '../../http/controller/user/input/ISetEndTime';

@injectable()
@EntityRepository(TimeSheetLog)
export class PostgreSQLTimeSheetRepository extends Repository<TimeSheetLog> implements ITimeSheetRepository {
    public async getLastActivityForUser(userId: string, acitivtyId?: string): Promise<TimeSheetLog> {
        const queryResult = await this.query(`SELECT * FROM "time_sheet_log" WHERE "userId" = '${userId}' AND "createdAt" = (SELECT MIN("createdAt") FROM "time_sheet_log" WHERE "userId" = '${userId}')`);
        return queryResult;
    }
    
    public async getById(id: string): Promise<TimeSheetLog> {
        const queryResult = await this.query(`SELECT * FROM "time_sheet_log" WHERE id = '${id}'`);
        return queryResult;
    }

    public async getStatistic(userId?: string): Promise<IGetStatisticsOutput[]> {
        let having ='';
        if(userId) {
            having = `HAVING "t"."userId" = '${userId}' `
        }
        const queryResult = await this.query(
            `SELECT "u"."name" "name", "u"."surnname", "surnname", TO_CHAR("t"."startTime", 'DD/MM/YY') "day", 
            "t"."description" "description", 
            "t"."userId" "userId", 
            SUM(DATE_PART('day', "t"."endTime" - "t"."startTime") * 24 + 
            DATE_PART('hour', "t"."endTime" - "t"."startTime") + DATE_PART('minute', "t"."endTime" - "t"."startTime")/60) "loggedTime" 
            FROM "user" "u" 
            INNER JOIN "time_sheet_log" "t" ON "t"."userId" = "u"."id" 
            GROUP BY("u"."name", "u"."surnname", "day", "t"."userId", "t"."description") ${having}`
        );
        //add to query having endTime IS NOT NULL
        return queryResult;
    }
    
    public async setStartTime(setStartTimeInput: ISetStartTime): Promise<void> {
        return;
    }
    
    public async setEndTime(setEndTimeInput: ISetEndTime): Promise<void> {
        return;
    }
}