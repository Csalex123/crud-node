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
    } else {
        console.log(`DB connection falied \n Error: ${JSON.stringify(err, undefined, 2)}`)
    }
});


app.listen(3333);

// Get all users
app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.error(err)
        }
    });
});


// Get one user with filter
app.get('/user/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.error(err)
        }
    });

});


//Delete User
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('DELETE FROM user WHERE id = ?', [id], (err, rows) => {
        if (!err) {
            res.send('Usuário deletado com sucessoo');
        } else {
            console.error(err)
        }
    });
});

// Insert user
app.post('/user', (req, res) => {
    const { name, email, salary } = req.body;

    mysqlConnection.query('INSERT INTO user (name, email, salary) VALUES (?, ?, ?)', [name, email, salary], (err, rows) => {
        if(!err){
            res.send('Usuário cadastrado com sucesso');
        }else{
            console.error(err);
        }
    })

});

// Update User
app.put('/user/:id', (req, res) => {
    const { name, email, salary } = req.body;
    const { id } = req.params;

    mysqlConnection.query('UPDATE user SET name = ?, email = ?, salary = ? WHERE id = ?',
        [name, email, salary, id],
        (err, rows) => {
            if (!err) {
                res.send('Usuário Atualizado com sucesso');
            } else {
                console.error(err);
            }
        }
    )
});