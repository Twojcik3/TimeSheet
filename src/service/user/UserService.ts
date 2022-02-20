import { IUserService } from "./IUserService";
import { inject, injectable } from 'inversify';
import { IUserRepository } from '../../repository/user/IUserRepository';
import { User } from '../../db/entity/User';
import { TIME_SHEET_APP_TYPES } from "../../TimeSheetAppTypes";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TIME_SHEET_APP_TYPES.Repository.UserRepository) private userRepository: IUserRepository
    ) {}
    public async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.getById(userId);
        return user;
    }
}