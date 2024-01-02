const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());

const PORT = 3000;


const url = 'mongodb://127.0.0.1:27017';
const dbName = 'CVmaker';

mongoose.connect(`${url}/${dbName}`).then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}`))
})
.catch(err => console.log(err));   

const db = mongoose.connection;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/User');

app.get('/new', (req, res) => {
    res.send('Hello World!');
});

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


