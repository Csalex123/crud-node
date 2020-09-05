const express = require('express');
const mysql = require('mysql');

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
        console.log(`DB connection falied \n Error: ${JSON.stringify(err)}`)
    }
});