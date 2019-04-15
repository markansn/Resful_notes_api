'use strict';


var mongoose = require('mongoose');
//var Note = mongoose.model('Notes','notes');
// var acrhiveNote = mongoose.model('Notes','archive')


function getNoteObject(isArchive) {
    var Note;
    if (isArchive) {

        Note = mongoose.model('Notes','archive')
    } else {

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

exports.list_all_notes_with_tags = function (req, res) {
    res = list_notes_with_tags(req,res,false);


};

exports.list_all_archived_notes_with_tags = function (req, res) {
    res = list_notes_with_tags(req,res,true);
}

function list_notes_with_tags(req,res,isArchive) {
    var Note = getNoteObject(isArchive);

    var tags = req.params.tags.split(",");


    Note.find({tags: {$all: tags}}, function(err, note) { //$all means all tags listed must be present. $in can be used as OR.
        if (err)
            res.send(err);
        res.json(note);
    });
}



exports.create_a_note = function(req, res) {

    var Note = mongoose.model('Notes');
    var new_note = new Note(req.body);

    new_note.save(function(err, note) {
        if (err) {

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
    var Note = getNoteObject(false);
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
    var Note = getNoteObject(false);
    Note.findOne({_id: req.params.noteId}, function(err, note) {

        res = archive_note(note,res,true);




    });


};


exports.unarchive_a_note = function (req, res) {
    var Note = getNoteObject(true);
    Note.findOne({_id: req.params.noteId}, function(err, note) {

        res = archive_note(note,res,false);




    });
};

function archive_note(note,res,isArchive) {
    var newNote = getNoteObject(isArchive);

    if(note != null) {
        var to_save = new newNote({
            _id: note._id,
            name: note.name,
            content: note.content,
            Created_date: note.Created_date
        });

        to_save.save(function (err, note) {
            if (err) {

                res.send(err);
            }
            res.json(note);
        });

        note.remove();

    } else {
        res.send({message: 'ERR: Note not found'});
    }



    return res;

}


