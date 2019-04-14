'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NotesSchema = new Schema({
    name: {
        type: String,
        required: 'Note title'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: 'Note content'
    },
    tags: {
        type: [String],
        required: []
    }
});

module.exports = mongoose.model('Notes', NotesSchema);
