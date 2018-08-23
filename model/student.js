const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = mongoose.SchemaTypes.ObjectId
const studentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    faculty: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    level: {
        type: String,
        require: true
    }
});

const Student = module.exports = mongoose.model('Student', studentSchema)