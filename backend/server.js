require('dotenv').config()
const express = require('express') // first step : import & create express app  
const mongoose = require('mongoose')
// create express app
const app = express() 
const workoutRoutes = require('./routes/workouts')

//middlewares
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {// second step : listen to port and routes c
        console.log('Connected to mongo DB & listening to port :', process.env.PORT) // create .env & process it
        })
    })
    // this might happpen if URI is incorrect or idpwd
    .catch((error)=>{
        console.log(error)
    })


process.env