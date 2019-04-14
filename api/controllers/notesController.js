'use strict';


var mongoose = require('mongoose');
//var Note = mongoose.model('Notes','notes');
// var acrhiveNote = mongoose.model('Notes','archive')


function getNoteObject(req) {
    var Note;
    if (req.params.isArchive == "true") {
        console.log("yes");
        Note = mongoose.model('Notes','archive')
    } else {
        console.log("no");
        Note = mongoose.model('Notes','notes')
    }

    return Note;
}


exports.list_all_notes = function(req, res) {
    //console.log(req.params.test123 == true);
    var Note = getNoteObject(req)
    Note.find({}, function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
});
};






exports.create_a_note = function(req, res) {
    var Note = getNoteObject(req);
    var new_note = new Note(req.body);
    new_note.save(function(err, note) {
        if (err)
            console.log(err);
            res.send(err);
        res.json(note);
    });
};


exports.read_a_note = function(req, res) {
    Note.findById(req.params.noteId, function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};


exports.update_a_note = function(req, res) {
    Note.findOneAndUpdate({_id: req.params.noteId}, req.body, {new: true}, function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};


exports.delete_a_note = function(req, res) {


    Note.remove({
        _id: req.params.noteId
    }, function(err, note) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};