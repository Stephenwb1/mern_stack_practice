require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

//express app
const app = express();

//middlewarre
app.use(express.json());

app.use((req, res, next) => { //the next thing here is to continue to the next thing
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connect to db
//asynchronous, therefore it returns a promise, therefore we can tack on a .then() method to fire a function when its complete, and a .catch to catch any kind of error
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db; listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

