const http = require('http');

const {getTurnos, getTurno, reservaTurno, updateTurno, deleteTurno} = require('./controllers/turnoController');

const server = http.createServer((req, res) => {

    if (req.url === "/api/turnos" && req.method === "GET") {
        getTurnos(req, res);
    } else if (req.url.match(/\/api\/turnos\/\w+/) && req.method === 'GET') {
        const email = req.url.split('/')[3];
        getTurno(req, res, email);
    } else if (req.url === '/api/turnos' && req.method === 'POST') {
        reservaTurno(req, res);
    } else if (req.url.match(/\/api\/turnos\/\w+/) && req.method === 'PUT') {
        const email = req.url.split('/')[3];
        updateTurno(req, res, email);
    } else if (req.url.match(/\/api\/turnos\/\w+/) && req.method === 'DELETE') {
        const email = req.url.split('/')[3];
        deleteTurno(req, res, email);
    }

});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { `Server running on port ${PORT}` });


