'use strict';
module.exports = function(app) {
    var noteapp = require('../controllers/notesController');


    app.route('/notes/:isArchive')
        .get(noteapp.list_all_notes)
        .post(noteapp.create_a_note);



    app.route('/notes/:isArchive/:noteId')
        .get(noteapp.read_a_note)
        .put(noteapp.update_a_note)
        .delete(noteapp.delete_a_note);
};