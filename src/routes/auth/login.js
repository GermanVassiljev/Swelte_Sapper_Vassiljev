import * as api from 'api.js';

export function post(req, res) {
    api.post('session', req.body ).then(response => {
        if (response.user) req.session.user = response.user;
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(response));
    });
}