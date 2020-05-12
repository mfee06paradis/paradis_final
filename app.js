const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const tempRoutes = require('./routes/tempR');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); //TODO: 放這裡沒問題嗎



// app.use((req, res, next)=>{
//     console.log('node server is running');
//     next();
// });


app.use('/members', require(__dirname + '/routes/members'));
app.use('/creditCards', require(__dirname + '/routes/creditCards'));

app.use('/', tempRoutes);

app.use(express.static('public'));


app.use((req, res)=>{
    res.type('text/html');
    res.status(404);
    res.send(`path: ${req.url}` + '<br>404 - 找不到網頁');
});

app.listen(5000);