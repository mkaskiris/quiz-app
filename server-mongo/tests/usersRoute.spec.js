// const { resetTestDB } = require('./config')
<<<<<<< HEAD
//const User = require('../models/user');

=======
const User = require('../models/user');

//qjest.setTimeout(50000)
>>>>>>> 0fbcc7555532793165fa719a096790b321ea330d
describe('users endpoints', () => {
   let api;
   
   beforeEach(async () => {
      await resetTestDB();
   });

   beforeAll(async () => {
      api = app.listen(port, () => console.log('Test server running on port 5000'));
   });

   afterAll(done => {
      console.log('Gracefully stopping test server');
      api.close(done);
   });

   it("should return data for all users", async () => {
      const res = await request(api).get('/users')
      expect(res.statusCode).toEqual(200);
      expect(res.body.entries.length).toEqual(3);
   });

   it('should return data for a single user', async () => {
      const res = await request(api).get('/users/TestUser1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.user._id).toBeTruthy();
      delete res.body.user._id
      expect(res.body.user).toEqual(
         {
            name: 'TestUser1',
            easy: 30,
            medium: 25,
            hard: 20
        });
      });

   it('should return an error for a user that does not exist', async () => {
      const res = await request(api).get('/users/doesntexist');
      expect(res.statusCode).toEqual(404);
      expect(res.body.user).toBeFalsy()
   });
<<<<<<< HEAD

   it('should return welcome on root page', async ()=>{
      const res = await request(api).get('/');
      expect(res.statusCode).toEqual(200)
   })
   
=======
   
    /*
   it('should return 201 after upserting', async () => {
      const testData = {
      entries: [
         {
            name: 'TestUser4',
            easy: 10,
            medium: 5
         }
      ]}
      const res = await request(api).post('/users/upsert').send(testData);
      expect(res.statusCode).toEqual(201);
   });
    
    it('resolves with a new user on successful db query', async () => {
        const data = {
            name: "TestUser4",
        }

        const user = await User.upsert(data);
        const users = await User.all;
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(users.all.length).toEqual(4);
    });*/
>>>>>>> 0fbcc7555532793165fa719a096790b321ea330d
});

