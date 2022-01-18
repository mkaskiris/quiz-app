//const db = connect("mongodb://localhost:27017/mongotest")
const db = connect("mongodb+srv://quiz_user:quiz1234@quiz-app-ireland.58s8z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db.users.drop()

db.users.insertMany([
    {
      name: 'TestUser1',
      easy: 30,
      medium: 25,
      hard: 20
    },
    {   
      name: 'TestUser2',
      easy: 20,
      medium: 15
    },
    {   
      name: 'TestUser3',
      medium: 5,
    }
]);