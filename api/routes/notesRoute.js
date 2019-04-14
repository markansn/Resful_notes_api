'use strict';
module.exports = function(app) {
    var noteapp = require('../controllers/notesController');


    app.route('/notes/archive')
        .get(noteapp.list_all_archived_notes);

    app.route('/notes')
        .get(noteapp.list_all_notes)
        .post(noteapp.create_a_note);


    app.route('/notes/:noteId')
        .get(noteapp.read_a_note)
        .put(noteapp.update_a_note)
        .delete(noteapp.delete_a_note);

    app.route('/notes/add_archive/:noteId')
        .put(noteapp.archive_a_note);

    app.route('/notes/archive/:noteId')
        .get(noteapp.read_an_archived_note)
        .delete(noteapp.delete_an_archived_note);
};