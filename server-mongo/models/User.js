const { init } = require ('../db_config/dbConfig')
//const { ObjectId } = require('mongodb')

class User {
   constructor(data){
      this.user = data.user
      this.easy = data.easy || 0
      this.medium = data.medium || 0
      this.hard = data.hard || 0
   };
    
   static get all(){
      return new Promise (async (resolve, reject) => {
         try {
            const db = await init()
            const userDB = db.collection('users')
            const userList = await userDB.find().toArray()
            //console.log(userList)
            resolve(userList);
         } catch (err) {
            reject(`Error retrieving users ${err}`)
         }
      });
   };

   static upsert(entries) {
      return new Promise (async (resolve, reject) => {
         try {
            entries = entries.map(e => {
               const scoreKey = Object.keys(e).filter(key => ['easy', 'medium', 'hard'].find(e => e === key))[0]
               return {
                  updateOne:  {
                        filter: { name: e.name },
                        update: { $set: { [scoreKey]: e[scoreKey] }},
                        upsert: true
                              }
                     }
            })
            const db = await init()
            const userData = await db.collection('users').bulkWrite(entries)
            //console.log(userData)
            resolve (userData.result)
         } catch (err) {
            reject(`Error creating new user ${err}`)
         }
      });
   };

   static findByName(name){
      return new Promise (async (resolve, reject) => {
         try {
            const db = await init();
            const userData = await db.collection('users').findOne({ name: name })//({ _id: ObjectId(id) }).toArray()
            resolve (userData);
         } catch (err) {
            reject('User not found');
         }
      });
   };

   static delete(name) {
      return new Promise (async (resolve, reject) => {
         try {
            const db = await init();
            const userData = await db.collection('users').findOneAndDelete({ name: name })//({ _id: ObjectId(id) }).toArray()
            resolve (userData);
         } catch (err) {
            reject('User not found');
         }
      });
   };
};

module.exports = User