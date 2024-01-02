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

app.get('/new', async (req, res) => {
    const data = await User.find({ password: "8052202123" });
    res.json(data);
    console.log(data);
    if (data.password === "8052202123") {
        console.log("success");
    }

});
//update
app.put('/update', async (req, res) => {
    console.log(req.body);
    await User.updateOne({ _id: req.body.id }, { username: "manmohan" });
    res.send({ success: true, message: "data updated" });
});
app.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username,email, password);
        const data = await User.find({ email: email, password: password });
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


