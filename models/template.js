const mongoose = require("mongoose");

const templateschema = new mongoose.Schema({
    title: {type: String, required:true, unique:true},
    content:{type: String, required: true},
    
},{timestamps:true});

const template = mongoose.model('template',templateschema);

module.exports = template;