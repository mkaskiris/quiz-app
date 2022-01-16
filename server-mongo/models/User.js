const { init } = require ('../db_config/dbConfig')
//const { ObjectId } = require('mongodb')

class User {
   constructor(data){
      this.user = data.user
      this.quiz = [data.quizzes]
   }
    
   static get all(){
      return new Promise (async (resolve, reject) => {
         try {
            const db = await init()
            const userList = await db.collection('users').find().toArray()
            resolve(userList);
         } catch (err) {
         
            reject("Error retrieving users")
         }
      })
   }

   static upsert(entries) {
      return new Promise (async (resolve, reject) => {
         try {
            entries = entries.map(e => {
               const scoreKey = Object.keys(e).filter(key => ['easy', 'medium', 'hard'].find(e => e === key))[0]
               return {
                  updateOne: {
                     filter: { name: e.name },
                     update: { $inc: { [scoreKey]: e[scoreKey] } },
                     upsert: true
                  }
               }
            })
            const db = await init()
            const userData = await db.collection('users').bulkWrite(entries)
            resolve (userData.result)
         } catch (err) {
            reject(`Error creating new user ${err}`)
         }
      })
   }

   static findByUser(user){
      return new Promise (async (resolve, reject) => {
         try {
            const db = await init();
            const userData = await db.collection('users').findOne({ name: user })//({ _id: ObjectId(id) }).toArray()
            resolve (userData);
         } catch (err) {
            reject('User not found');
         }
      })
   }

   static delete(user) {
      return new Promise (async (resolve, reject) => {
         try {
            const db = await init();
            const userData = await db.collection('users').remove({ name: user })//({ _id: ObjectId(id) }).toArray()
            resolve (userData);
         } catch (err) {
            reject('User not found');
         }
      })
   }
}

module.exports = User