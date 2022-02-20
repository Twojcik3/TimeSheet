import { User } from '../../db/entity/User';

export interface IUserService {
    getUserById(userId: string): Promise<User>;
}