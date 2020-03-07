const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let aricleSchema = mongoose.Schema({
    date: { type: mongoose.Schema.Types.Date, default: Date.now },
    title: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
    shortDescription: { 
        type: mongoose.Schema.Types.String, 
        maxlength: [30, 'Description should be 30 symbols or less'] 
    },
    text: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, }
});

let article = mongoose.model('article', aricleSchema);

module.exports = article;