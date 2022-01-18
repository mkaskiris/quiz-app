const User = require('../models/User');
const { init } = require('../db_config/dbConfig');
// const {MongoClient} = require('mongodb')
// jest.mock('MongoClient')

//const db = require('../db_config/dbConfig');

describe('model tests', ()=> {
    //let db;

    // beforeAll(async () => {
    //     db = await init();
    // });

    beforeEach(async () => {
        await resetTestDB();
    });
     
    afterAll(() => jest.resetAllMocks())

    describe('all', ()=>{
        test('resolves array of users in db', async ()=>{

            const all = await User.all;
            expect(all).toHaveLength(3)
        });
        // test('returns error', async ()=>{
        //     const all = await User.all;
        //     expect(all).toBe('Error retrieving users')
        // })
    });
  
    describe('upsert', ()=>{
        test('updates users high score', async ()=> {
            const sendData = [{
                                name: 'TestUser1',
                                easy: 100,
                            }] 
            await User.upsert(sendData);
            const find = await User.findByName('TestUser1')
            expect(find.easy).toEqual(100)
            expect(find.medium).toEqual(25)
        });
        test('Creates new user if one doesnt exist', async ()=> {
            const sendData = [{
                                name: 'James',
                                easy: 5,
                            }] 
            await User.upsert(sendData);
            const find = await User.findByName('James')
            expect(find).toBeTruthy()
            expect(find.easy).toEqual(5)
        });
    });

    describe('findByName', ()=>{
        

        test('resolves an object for TestUser1', async ()=> {
            const user = await User.findByName('TestUser1');
            expect(typeof(user)).toEqual('object')
            expect(user).toHaveProperty("name", "_id", "easy", 'medium', "hard")
        });
    })

    describe('delete', ()=>{
        test('deletes a user', async ()=>{

            await User.delete('TestUser1') ;
            const user = await User.findByName('TestUser1');
            expect(user).toBe(null)
        })
    })
});


