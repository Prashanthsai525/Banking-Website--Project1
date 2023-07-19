const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');

dotenv.config({path:"./mongo.env"});
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => console.log("Database connected")).catch((err)=>console.log("connection error"));
mongoose.set('useFindAndModify', false);


app.use(express.json())

app.use('/', routesUrls);
app.listen(27017, function () {
    console.log("Running");
});