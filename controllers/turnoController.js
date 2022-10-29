const Turno = require('../models/turnoModel');
const { getPostData } = require('../utils');


// @desc  Retorna todos los turnos tomados
// @route GET /api/Turnos
async function getTurnos(req, res) {
    try {
        const turnos = await Turno.findAll();
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.write(JSON.stringify(turnos));
        res.end();
    } catch (error) {
        console.log(error)
    }
}


// @desc  Obtiene un turno en base al email
// @route GET /api/turnos/:email
async function getTurno(req, res, email) {
    try {
        const turno = await Turno.findByEmail(email);

        if (!turno) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: 'Turno Not Found' }));
        } else {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.write(JSON.stringify(turno));
            res.end();

        }

    } catch (error) {
        console.log(error)
    }
}


// @desc  reserva un turno
// @route POST /api/turnos
async function reservaTurno(req, res) {
    try {

        const body = await getPostData(req);
        const { fecha, email, branchId } = JSON.parse(body);
        const turno = {
            fecha,
            email,
            branchId
        }

        const turno_consulta = {
            fecha,
            branchId
        }

        const turno_disponible = await Turno.availableTurno(turno_consulta);
        if (turno_disponible) {
            res.writeHead(201, { 'Content-type': 'application/json' });
            const newTurno = await Turno.create(turno);
            await Turno.removeAvailableTurno(turno_consulta);
            return res.end(JSON.stringify(newTurno));
        } else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            return res.end(JSON.stringify({ message: "No hay turnos disponible" }));
        }


    } catch (error) {
        console.log(error)
    }
}


// @desc  Update un Turno
// @route PUT /api/turnos/:id
async function updateTurno(req, res, email) {
    try {

        const turno = await Turno.findByEmail(email);

        if (!turno) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: 'El turno no existe' }));
        } else {
            const body = await getPostData(req);

            const {  fecha, branchId } = JSON.parse(body);

            const turnoData = {
                fecha: fecha || turno.fecha,                
                branchId: branchId || turno.branchId
            }          
    
            const turno_disponible = await Turno.availableTurno(turnoData);
            if (turno_disponible) {
                const old_turno = {
                    fecha:turno.fecha,
                    branchId: turno.branchId
                }
                const updTurno = await Turno.update(email, turnoData);
                await Turno.removeAvailableTurno(turnoData);
                res.writeHead(200, { 'Content-type': 'application/json' });
                await Turno.addAvailableTurno(old_turno);
                return res.end(JSON.stringify(updTurno));
                
            }
            
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc  Delete Turno
// @route DELETE /api/turnos/:email
async function deleteTurno(req, res, email) {
    try {
        const turno = await Turno.findByEmail(email);

        if (!turno) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: `No existe un turno registrado con el email ${email}` }));
        } else {
            await Turno.remove(email);
            const old_turno = {
                fecha:turno.fecha,
                branchId: turno.branchId
            }
            await Turno.addAvailableTurno(old_turno);

            res.writeHead(200, { 'Content-type': 'application/json' });
            res.write(JSON.stringify({message:`El turno para el email ${email} ha sido removido`}));
            res.end();

        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getTurnos,
    getTurno,
    reservaTurno,
    updateTurno, 
    deleteTurno
}