const mysql = require('mysql2');
const bluebird = require('bluebird');


const db = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'paradis',
    password:''
});


// const mysql = require('mysql');
// const bluebird = require('bluebird');

// const db = mysql.createConnection({
//     // socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'paradis'
// });



// db.on('error',ex=>{
//     console.log(ex);
// });
// db.connect();


bluebird.promisifyAll(db);
module.exports = db.promise();

// const mysql = require('mysql');
// const bluebird = require('bluebird');

// const db = mysql.createConnection({
//     // socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'paradis'
// });

// db.on('error',ex=>{
//     console.log(ex);
// });
// db.connect();

// bluebird.promisifyAll(db);
// module.exports = db;