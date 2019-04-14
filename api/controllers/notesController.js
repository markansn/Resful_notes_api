'use strict';


var mongoose = require('mongoose');
//var Note = mongoose.model('Notes','notes');
// var acrhiveNote = mongoose.model('Notes','archive')


function getNoteObject(isArchive) {
    var Note;
    if (isArchive) {
        console.log("yes");
        Note = mongoose.model('Notes','archive')
    } else {
        console.log("no");
        Note = mongoose.model('Notes','notes')
    }

    return Note;
}


exports.list_all_notes = function(req, res) {
    res = list_all_notes(req, res,false);

};

exports.list_all_archived_notes = function (req, res) {
    res = list_all_notes(req, res, true);
};


function list_all_notes(req,res,isArchive) {
    var Note = getNoteObject(isArchive)
    Note.find({}, function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};



exports.create_a_note = function(req, res) {
    //var Note = getNoteObject(false);
    var Note = mongoose.model('Notes');
    var new_note = new Note(req.body);
    new_note.save(function(err, note) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(note);
    });
};


exports.read_a_note = function(req, res) {
    res = read_a_note(req,res,false);
};

exports.read_an_archived_note = function(req, res) {
    res = read_a_note(req,res,true);
};

function read_a_note(req, res, isArchive) {
    var Note = getNoteObject(isArchive)
    Note.findById(req.params.noteId, function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });

    return res;
}


exports.update_a_note = function(req, res) {
    Note.findOneAndUpdate({_id: req.params.noteId}, req.body, {new: true}, function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};



exports.delete_a_note = function(req, res) {
    res = delete_a_note(req, res, false)
};

exports.delete_an_archived_note = function(req, res) {
    res = delete_a_note(req, res, true)
};

function delete_a_note(req, res, isArchive) {
    var Note = getNoteObject(isArchive);
    Note.remove({
        _id: req.params.noteId
    }, function(err, note) {
        if (err)
            res.send(err);
        res.json({ message: 'Note successfully deleted' });
    });
    return res;

}

exports.archive_a_note = function(req, res) {
    console.log(req.params.noteId);

}
