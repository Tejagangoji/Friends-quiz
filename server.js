require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/userModel');
const questionModel = require('./models/questionModel');
const Scoremodel = require('./models/Scoremodel');

const app = express();

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB).then(
    console.log("db is connected")
);

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.post('/register', async (req, res) => {
    try {
        const { name } = req.body;
        let randomvar = '';
        const allcharecters = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < 9; i++) {
            randomvar += allcharecters.charAt(Math.floor(Math.random() * allcharecters.length));
        }
        const newuser = new userModel({
            name: name,
            userid: randomvar,
        });
        await newuser.save();
        return res.status(200).json(await newuser);
    } catch (err) {
        return res.status(500).json("server error");
    }
});

app.post('/answer-quiz/:id', async (req, res) => {
    try {
        const { data, name } = req.body;
        const newquiz = new questionModel({
            userid: req.params.id,
            name: name,
            data: data
        });
        await newquiz.save();
        return res.status(200).json(await questionModel.find());
    } catch (err) {
        console.log(err.message);
    }
});

app.get('/answer/:id', async (req, res) => {
    try {
        const individual = await questionModel.findOne({userid: req.params.id});
        return res.status(200).json(individual);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

app.post('/quiz-score', async (req, res) => {
    try {
        const {userid, name, score} = req.body;
        const userscore = new Scoremodel({
            userid, name, score
        });
        await userscore.save();
        return res.status(200).json(userscore);
    } catch (err) {
        console.log(err.message);
    }
});

app.get('/ownscore/:id', async (req, res) => {
    const {userid} = req.body;
    try {
        const own = await Scoremodel.find({userid: req.params.id});
        return res.status(200).json(await own);
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => console.log("server is running"));