import {Entity, Column, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { BaseEntity } from './BaseEntity';

@Entity()
export class TimeSheetLog extends BaseEntity {
    @ManyToOne(() => User, user => user.timeSheetLogs, {nullable: true})
    @JoinColumn({ name: 'userId' })
    public user: User;

    @Column({ nullable: true })
    public userId: string;

    @Column({ name: 'startTime'})
    protected _startTime: Date;

    public set startTime(value: Date) {
        this._startTime = value;
    }

    @Column({ name: 'endTime', nullable: true})
    protected _endTime: Date;

    public set endTime(value: Date) {
        this._endTime = value;
    }

    @Column({ name: 'description' , length:320 })
    protected _description: string;

    public set description(value: string) {
        this._description = value;
    }
}

