import { DbConfig } from "./db/dbConfig";

export class AppConfig {
    private readonly _dbConfig: DbConfig;

    private _port = 3000;
    private _endpoint = 'http://127.0.0.1:3000/';

    constructor() {
        this._dbConfig = new DbConfig();
    }

    public get port(): number {
        return this._port;
    }

    public get endpoint(): string {
        return this._endpoint;
    }

    public deserialize(setting: any): any {
        this._port = parseInt(setting.port);
        this._endpoint = setting.endpoint;
    }

    public serialize(): object {
        return {
            port: this._port,
            endpoint: this._endpoint,
            dbConfig: this._dbConfig.serialize(),
        };
    }
}