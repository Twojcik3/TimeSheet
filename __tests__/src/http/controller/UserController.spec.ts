import 'jest';
import 'reflect-metadata';
import *  as httpMocks from 'node-mocks-http';
import { UserController } from '../../../../src/http/controller/user/UserController';

const userHandlerMock: any = jest.fn();
let validatorFactoryMock: any = jest.fn();
let res: any;
let req: any;
let userController: UserController;
let mockedValidator: any;
const mockedInput = {

}
describe('TimeSheetController tests', () => {
    beforeEach(() => {
        res = httpMocks.createResponse();
        req = httpMocks.createRequest();
        mockedValidator = jest.fn();
        userHandlerMock.setStartNewTime = jest.fn();
        jest.spyOn(userHandlerMock, 'setStartNewTime');
        userController = new UserController(
            userHandlerMock,
            validatorFactoryMock
        )
    });

    it('should return 400 when setStartTime input is not valid', async () => {
        mockedValidator.validate = () => { throw new Error('Invalid input')};
        await userController.startNewTime(req, res);
        expect(res.statusCode).toEqual(400);
    });

    it('should return 400 when setEndTime input is not valid', async () => {
        mockedValidator.validate = () => { throw new Error('Invalid input')};
        await userController.setEndTime(req, res);
        expect(res.statusCode).toEqual(400);
    });
});