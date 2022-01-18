// const { resetTestDB } = require('./config')
//const User = require('../models/user');

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

   it('should return welcome on root page', async ()=>{
      const res = await request(api).get('/');
      expect(res.statusCode).toEqual(200)
   })
   
});

