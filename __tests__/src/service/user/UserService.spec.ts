import 'jest';
import 'reflect-metadata';
import { User } from '../../../../src/db/entity/User';
import { UserService } from '../../../../src/service/user/UserService';

const mockedUser = new User();
const userRepositoryMocked: any = jest.fn;
const mockedUserId = '123e4567-e89b-12d3-a456-426614174012';
let userService: UserService;

describe('User Service tests', () => {
    beforeEach(() => {
        userService = new UserService (
            userRepositoryMocked,
        )
    });

    it('should return user', async () => {
        const getUserInput: any = jest.fn();
        userRepositoryMocked.getById = (): User => new User();
        const user = await userService.getUserById(getUserInput);
        expect(user).toBeInstanceOf(User);
    })
})
