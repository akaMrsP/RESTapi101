// https://medium.com/better-programming/use-express-to-build-a-rest-api-69bd4abb8e4a

'use strict';

const routes = (app) => {
    const note = require('../controllers/Note');

    // Note Route
    app.route('/note/:id?/')
        .get(note.get)
        .post(note.create)
        .put(note.update)
        .delete(note.delete);
};

module.exports = routes;