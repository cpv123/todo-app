const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = mongoose.connect('mongodb://127.0.0.1:27017/Todos');
const Todos = require('./models/todoModel');
const port = process.env.PORT || 3000;
const todoRouter = express.Router();

app.use('/api', todoRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD');
       next();
 });

todoRouter.route('/todos')
    .post((req, res) => {
        var todo = new Todos(req.body);
        console.log(todo.id)
        todo.save((err, todo) => {
            if (err) {
                res.send(err);
            } else {
                res.status(201).send(todo);
            }
        });

    })
    .get(cors(), (req, res) => {
        Todos.find((err, todos) => {
            if (err) { 
                console.log(err) 
            } else {
                res.json(todos);
            }
        });
    });

app.listen(port, () => {
    console.log('Running on port ' + port)
});

