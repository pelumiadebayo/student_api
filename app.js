const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/db');
const expressValidator = require('express-validator');


mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
const app = express();
app.use(expressValidator());


//checking for db's connection
db.once('open', () => {
    console.log('connected to mongo db');
});

//checking for db errors
db.on('error', (err) => {
    console.log(err);
});

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//setting up view engine directories
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//bring in student model
const Student = require('./model/student');

//home route to show tudents
app.get('/', (req, res) => {
    Student.find({}, (err, student) => {
        if (err) {
            console.log(err)
        } else {
            res.render('show_students', {
                title: 'Students',
                students: student
            });
        }
    });

});
//route to add student
app.get('/add', (req, res) => {
    res.render('add_student', {
        title: 'Add Student'
    });
});

//submit POST form from add_article.pug
app.post('/add', (req, res) => {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('department', 'Department is required').notEmpty();
    req.checkBody('faculty', 'Faculty is required').notEmpty();
    req.checkBody('level', 'Level is required').isNumeric();

    let errors = req.validationErrors();
    if (errors) {
        res.render('add_student', {
            title: 'Add Article',
            errors: errors
        })
    } else {
        const name = req.body.name;
        const faculty = req.body.faculty;
        const department = req.body.department;
        const level = req.body.level;

        let student = new Student();
        student.name = name;
        student.faculty = faculty;
        student.department = department;
        student.level = level;

        student.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        })
    }
});

//setting up port
app.listen(3000, () => {
    console.log('runnig on port 3000');
})

module.exports = app;