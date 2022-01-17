const usersController = require('../controllers/users');
const User = require('../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus, json: mockJson }

const testUser = { 
    user: "James",
}
const testUserTwo = { 
    user: "Raj"
}

describe('users controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('findByName', () => {
        it('returns a user document with a 200 status code', async () => {
            jest.spyOn(User, 'findByName')
                .mockResolvedValue('James');
            
            const mockReq = { params: { name: "TestUser1" } }
            
            await usersController.findByName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUser);
        });
    });

    describe('get all', () => {
        it('returns all users with a 200 status code', async () => {
            jest.spyOn(User, 'all', 'get')
                .mockResolvedValue([testUser,testUserTwo]);

            await usersController.getAll(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ entries: [testUser,testUserTwo] });
        })
    });
});