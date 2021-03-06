var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').createServer(app);

app.use(express.static(path.join(__dirname,'')));

const routes = require('./server/routes');
var { PORT } = require('./setup');
const connect = require('./server/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

connect();

app.get('/*',(req,res) => {
    res.sendFile(path.join(__dirname,'./client/index.html'));
});

http.listen(PORT,(req,res) => {
    console.log("Server is running on PORT: ", PORT);
});