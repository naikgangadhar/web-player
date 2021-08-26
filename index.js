const express = require('express');
const path = require("path");
const app = express();
require('dotenv').config()
const router = require("./routes/homeroutes");

app.use(express.static(path.join(__dirname , 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use("/" , router);


app.listen(process.env.PORT , function(){
    console.log(`Listing on Port ${process.env.PORT}`);
});