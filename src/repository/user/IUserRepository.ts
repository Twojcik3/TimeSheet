import { User } from "../../db/entity/User";

export interface IUserRepository {
    getById(id: string): Promise<User>;
    getAllUsers(): Promise<void>;
}