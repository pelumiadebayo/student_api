const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId


const departmentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    facultyId: {
        type: ObjectId,
        ref: "Faculty"
    }
})
const Department = module.exports = mongoose.model('Department', departmentSchema)