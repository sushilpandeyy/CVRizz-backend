const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const PORT = 3000;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'CVmaker';

mongoose.connect(`${url}/${dbName}`).then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
})
.catch(err => console.log(err));

const db = mongoose.connection;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/User');
const Template = require('./models/template');

// Route for the Landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.get('/signin', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/signup', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const data = await User.find({ username: username, password: password });
        if (data.length === 0) {
            res.status(401).send('Invalid credentials');
        }else{      
            console.log(data);
            res.status(201).json(data);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);
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

app.get('/templates', async (req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates);
        console.log(templates);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


