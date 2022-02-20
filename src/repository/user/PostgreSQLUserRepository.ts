import { injectable } from 'inversify';
import { EntityRepository, getConnection, Connection, Repository, getRepository } from 'typeorm';
import { User } from '../../db/entity/User';
import { IUserRepository } from './IUserRepository';

@injectable()
@EntityRepository(User)
export class PostgreSQLUserRepository extends Repository<User> implements IUserRepository {
    public async getById(id: string): Promise<User> {
       const queryResult = await this.query(`SELECT * FROM "user" WHERE id = '${id}'`)
       return queryResult;
    }
    public async getAllUsers(): Promise<void> {
        const query = await this.query('SELECT * FROM public."user"');
        console.log(query);
        
    }

}