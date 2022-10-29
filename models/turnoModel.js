let turnos = require('../data/turnos');
let turnos_disponibles = require('../data/turnos_disponibles.json');
const {hashCode, writeDataToFile} = require('../utils')


function findAll() {
    return new Promise((resolve, reject) =>{
        resolve(turnos);
    })
}

function findByEmail(email) {
    return new Promise((resolve, reject) =>{
        const turno = turnos.find((p) => p.email===email);
        resolve(turno);
        
    })
}


function create(turno) {
    return new Promise((resolve, reject) =>{
        
        const newTurno = {id:hashCode(turno.email),...turno};
        turnos.push(newTurno);
        writeDataToFile('./data/turnos.json', turnos);
        resolve(newTurno);
    })
}

function update(email, turno) {
    return new Promise((resolve, reject) =>{
        const index = turnos.findIndex((p) => p.email === email)
        turnos[index] = {userid:hashCode(email), email,...turno}
                
        writeDataToFile('./data/turnos.json', turnos);
        resolve(turnos[index]);
    })
}

function remove(email) {
    return new Promise((resolve, reject) =>{
        
        turnos = turnos.filter((p) => p.email !== email)
        writeDataToFile('./data/turnos.json', turnos);        
        resolve();
    })
}

function availableTurno(turno) {
    return new Promise((resolve, reject) => {
        const turno_dispo = turnos_disponibles.find((p) => p.fecha===turno.fecha && p.branchId===turno.branchId);
        resolve(turno_dispo);
    })
}

function removeAvailableTurno(turno) {
    return new Promise((resolve, reject) =>{
        
        const turno_dispo = turnos_disponibles.find((p) => p.fecha===turno.fecha && p.branchId===turno.branchId);
        console.log("inside removeAvailableTurno --> ", turno_dispo)
        if (turno_dispo) {
            turnos_disponibles = turnos_disponibles.filter((p) => !(p.fecha===turno.fecha && p.branchId===turno.branchId));
            writeDataToFile('./data/turnos_disponibles.json', turnos_disponibles);
        }
        resolve();
    })
}

function addAvailableTurno(turno) {
    return new Promise((resolve, reject) =>{
        turnos_disponibles.push(turno);
        writeDataToFile('./data/turnos_disponibles.json', turnos_disponibles);
        resolve(turno);
    })
}

module.exports = {findAll, findByEmail, create, availableTurno, removeAvailableTurno, update, addAvailableTurno, remove};

