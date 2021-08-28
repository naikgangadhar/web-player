const express = require('express');
const path = require("path");
const app = express();
require('dotenv').config()
const router = require("./Routes/homeroutes");
const Sequelize= require("sequelize");


const sequelize = new Sequelize(process.env.DATABASE , process.env.USERNAME , process.env.PASSWORD ,{
    host : 'localhost',
    dialect : 'mysql'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.use(express.static(path.join(__dirname , 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use("/" , router);


app.listen(process.env.PORT , function(){
    console.log(`Listing on Port ${process.env.PORT}`);
});