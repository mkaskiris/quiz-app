const { MongoClient } = require('mongodb')
const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME

const init = async () => {
  let client = await MongoClient.connect("mongodb+srv://quiz_user:quiz1234@quiz-app-ireland.58s8z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  //console.log('connected to database!', dbName)
  return client.db('users')
}

module.exports = { init };