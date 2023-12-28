const express = require('express');
const { MongoClient } = require('mongodb');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;


const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'CVmaker';
let db;

async function main() {
   
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db(dbName); 
    startServer(); 
}


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/User');


app.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        const collection = db.collection('users');
        await collection.insertOne({ username, email, password }); // Use await for async operations
        console.log('Inserted 1 document into the collection');
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


function startServer() {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}


main();
