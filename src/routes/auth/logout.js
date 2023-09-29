import * as api from 'api.js';

export function post(req, res) {
    api.del('session', req.session.token).then(response => {
        res.end(JSON.stringify(response));
    });
}