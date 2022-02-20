import {Entity, Column, OneToMany} from "typeorm";
import { TimeSheetLog } from './TimeSheetLog';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity{
    @OneToMany(() => TimeSheetLog, timeSheetLog => timeSheetLog.user, {nullable: true})
    public timeSheetLogs: TimeSheetLog[];

    @Column({ name: 'surnname' , length:320 })
    protected _surnname: string;

    public set surnname(value: string) {
        this._surnname = value;
    }

    public get surnname(): string {
        return this._surnname;
    }

    @Column({ name: 'name' , length:320 })
    protected _name: string;

    public set name(value: string) {
        this._name = value;
    }

    public get name(): string {
        return this._name;
    }

    @Column({ name: 'email', unique: true , length:320 })
    protected _email: string;

    public set email(value: string) {
        this._email = value;
    }

    public get email(): string {
        return this._email;
    }

    @Column({ name: 'password', nullable: true })
    protected _password: string;

    public set password(value: string) {
        this._password = value;
    }

    public get password(): string {
        return this._password;
    }

}
