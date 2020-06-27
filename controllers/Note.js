const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./db');

module.exports = {

    get(request, response) {
        if (localStorage.getItem('notes')) {
            if (!request.params.id) {
                // Return all notes
                response.json({
                    notes: JSON.parse(localStorage.getItem('notes'))
                });
            } else {
                // Return single note
                const note = JSON.parse(localStorage.getItem('notes'))
                                 .filter(note.id === parseInt(request.params.id, 10));

                response.json({
                    note
                });
            }
        } else {
            // No notes set on localStorage, fall back to empty repsonse
            response.json({
                notes: []
            });
        }
    },

    
    create(request, response) {
        
        console.log(request.body);
        if (request.body.name && request.body.completed) {
            // Add new todo
            
            const notes = JSON.parse(localStorage.getItem('notes')) || [];

            notes.push({
                id: notes.length,
                name: request.body.name,
                completed: request.body.completed === 'true'
            });

            localStorage.setItem('notes', JSON.stringify(notes));

            response.json({
                message: 'Note has been successfully created. 🎉'
            });
        } else {
            response.json({
                error: '⚠️ You must provide a name and a completed state.'
            });
        }
    },
    
    
    update(request, response) {
        console.log(request.params);
        if (request.params.id && (request.body.name || request.body.completed)) {
            // Update note
            const notes = JSON.parse(localStorage.getItem('notes'));

            notes.forEach(note => {
                if (parseInt(request.params.id, 10) === note.id) {
                    note.name = request.body.name || note.name;

                    if (request.body.completed) {
                        note.completed = request.body.completed === 'true';
                    }
                }
            });
            console.log(notes);
            localStorage.setItem('notes', JSON.stringify(notes));
            console.log(notes);

            response.json({
                message: 'Note has been successfully updated. 🎉'
            });

        } else {
            response.json({
                error: '⚠️ You must provide an id and a property to update.'
            });
        }
    },
    
    
    delete(request, response) {
        if (request.params.id) {
            const notes = JSON.parse(localStorage.getItem('notes'))
                            .filter(note => note.id !== parseInt(request.params.id, 10));

            localStorage.setItem('notes', JSON.stringify(notes));

            response.json({
                message: 'Note has been successfully removed. 🗑️'
            });

        } else {
            response.json({
                error: '⚠️ You must provide an id.'
            });
        }
    },
};