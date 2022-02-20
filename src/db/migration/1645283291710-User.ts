import {MigrationInterface, QueryRunner} from "typeorm";

export class User1645283291710 implements MigrationInterface {
    name = 'User1645283291710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheet_log" DROP COLUMN "employeeId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheet_log" ADD "employeeId" character varying`);
    }

}
