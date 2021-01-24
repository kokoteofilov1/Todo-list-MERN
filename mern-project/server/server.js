require('dotenv').config({path: './.env'})

const express = require('express');
const mongoose = require('mongoose');
const ToDo = require('./models/todo');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mycluster.spkoy.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const MongoStore = require('connect-mongo')(session);

const PORT = 4000;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use(session({
    store: new MongoStore({url: dbURL}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB is connected!")
    } catch (error) {
        console.log(error);
    }
}

connectDB();

app.post('/api/SignUp', async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            todo: [{title: 'This is a test todo!'}, {title: 'second test todo'}]
        });
        res.send({
            emailTaken: false,
        })
    } catch (error) {
        res.send({
            emailTaken: true,
        })
    }
})

app.post('/api/SignIn', async (req, res) => {
    const user = await User.findOne({'email': req.body.email});
    if (await bcrypt.compare(req.body.password, user.password)) {
        if (req.session) {
            req.session.userID = user._id;
        }

        console.log(req.session.sid);

        res.send({
            success: true,
            userID: user._id
        })
    } else {
        res.send({
            success: false
        })
    }
})

app.post("/api/Create", async (req, res) => {
    await User.findByIdAndUpdate(req.session.userID,
        {$push: {todo: {title: req.body.title}}},
        {safe: true, upsert: true},
    );

    res.end();
});

app.post("/api/Delete", async (req, res) => {
    await User.findByIdAndUpdate(req.session.userID,
        {$pull: {todo: {_id: req.body._id}}},
        {safe: true, upsert: true},
    );

    res.end();
});

app.post("/api/Edit", async (req, res) => {
    console.log(req.body.todo.title);
    await User.updateOne(
        {"_id": req.session.userID, "todo._id": req.body.todo._id},
        {"$set": {"todo.$.title": req.body.todo.title}},
    );

    res.end();
});


app.get("/api/User", async (req, res) => {
    const user = await User.findOne({"_id": req.session.userID});
    res.send({
        todo: user.todo
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
