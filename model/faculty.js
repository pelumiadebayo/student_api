const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const facultySchema = new Schema({
    name: {
        type: String,
        require: true
    }
})
const Faculty = module.exports = mongoose.model('Faculty', facultySchema)