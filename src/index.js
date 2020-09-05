const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_node'
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB connection succeded');
    }else {
        console.log(`DB connection falied \n Error: ${JSON.stringify(err, undefined, 2)}`)
    }
});


app.listen(3000);

// Get All users
app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }else{
            console.log(err)
        }
    });
});