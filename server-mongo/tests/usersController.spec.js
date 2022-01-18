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
                .mockResolvedValue(true);
            
            const mockReq = { params: { name: "TestUser1" } }
            
            const user = await usersController.findByName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            //expect(user).toHaveProperty({user: true});
        });
        it('returns a 404 when user doesnt exist', async () => {
            jest.spyOn(User, 'findByName')
                .mockResolvedValue(false);
            
            const mockReq = { params: { name: "TestUser5000"} }
            
            const user = await usersController.findByName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
            // expect(mockJson).toHaveBeenCalledWith(testUser);
        });
        it('returns a 500 when no param entered', async () => {
            jest.spyOn(User, 'findByName')
                .mockRejectedValue()
            
            const mockReq = { params: {} }
            
            await usersController.findByName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
            // expect(mockJson).toHaveBeenCalledWith(testUser);
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

    describe('upsert', () => {
        it('returns a 201 when updating a score', async () => {
            jest.spyOn(User, 'upsert')
                .mockResolvedValue();
            
            const mockReq = { body: {entries: [{ name: "TestUser1", easy: 150 }]} }
            
            await usersController.upsert(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            //expect(mockJson).toHaveBeenCalledWith(testUser);
        });
        it('returns a 500 when entry isnt valid user', async () => {
            jest.spyOn(User, 'upsert')
                .mockRejectedValue({});
            
            const mockReq = { params: { name: "TestUser5000", easy: 150 } }
            
            await usersController.upsert(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
            // expect(mockJson).toHaveBeenCalledWith(testUser);
        });
    });

    describe('deletebyname', ()=>{
        it('returns 204 if user was deleted', async () =>{
            jest.spyOn(User, 'delete')
                .mockResolvedValue({name:'Hellow'})
            
                const mockReq = { params: { name: "TestUser1"} }
                await usersController.deleteByName(mockReq,mockRes)
                expect(mockStatus).toHaveBeenCalledWith(204)
        })
        it('returns 404 if user it failed', async () =>{
            jest.spyOn(User, 'delete')
                .mockResolvedValue(false)
            
                const mockReq = { params: { name: "TestUser5000"} }
                await usersController.deleteByName(mockReq,mockRes)
                expect(mockStatus).toHaveBeenCalledWith(404)
        })
        it('returns 500 if no param entered', async () =>{
            jest.spyOn(User, 'delete')
                .mockRejectedValue({})
            
                const mockReq = { params: {} }
                await usersController.deleteByName(mockReq,mockRes)
                expect(mockStatus).toHaveBeenCalledWith(500)
        })
    })
});