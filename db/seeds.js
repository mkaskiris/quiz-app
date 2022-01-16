const db = connect("mongodb://localhost:27017/mongotest")

db.users.drop()

db.users.insertMany([
    { name: 'Mary',
      easy: 10,
      medium: 15,
      hard: 20
    },
    { name: 'Naz',
      easy: 20
    },
    { name: 'Eric',
      medium: 5,
    },
    {
       name: 'Ernie',
       hard: 30
    }
])