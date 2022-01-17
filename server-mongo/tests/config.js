const request = require('supertest');
const app = require('../../server');
const { initConnection } = require('../../dbConfig');

const dbName = process.env.DB_NAME;

function resetTestDB() {
    return new Promise(async (resolve, reject) => {
        try {
            // init client connection to db
            const client = await initConnection();
            // init database
            const db = client.db(dbName);
            // drop the users collection
            db.collection("users").drop((err) => {
                if (err) throw err;
            });
            // insert test data
            await db.collection("users").insertMany([
                {   name: 'TestUser1',
                    easy: 30,
                    medium: 25,
                    hard: 20
                },
                {   name: 'TestUser2',
                    easy: 20,
                    medium: 15
                },
                {   name: 'TestUser3',
                    medium: 5,
                },
            ]);
            // close the connection to db
            client.close(); 
            resolve(`${dbName} reset for testing`);
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        }
    });
}

global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;