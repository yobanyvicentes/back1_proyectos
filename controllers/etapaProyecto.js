const { request, response } = require('express');
const EtapaProyecto = require('../models/etapaProyecto');


// listar
const getEtapaProyecto = async (req = request, res = response) => {
    try {
        const etapaProyectos = await EtapaProyecto.find();
        res.status(200).send(etapaProyectos).json();
    } catch (error) {
        res.status(500).send(error);
    }
}

// crear 
const postEtapaProyecto = async (req = request, res = response) => {
    try {
        const etapaProyectoExiste = await EtapaProyecto.findOne({name: req.body.name});
        if(etapaProyectoExiste){
            return res.status(400).send(`la etapaProyecto con nombre ${etapaProyectoExiste} ya existe en el sistema, pruebe con otro nombre`)
        };

        let etapaProyecto = new EtapaProyecto();
        etapaProyecto.nombre = req.body.nombre;
        etapaProyecto.fechaCreacion = new Date;
        etapaProyecto.fechaActualizacion = new Date;

        etapaProyecto = await etapaProyecto.save();

        res.status(200).send(etapaProyecto).json();
    } catch (error) {
        res.status(500).send(error);
    }
}

// actualizar
const putEtapaProyecto = async (req = request, res = response) => {
    try {
        let etapaProyecto = await EtapaProyecto.findById(req.params.idEtapaProyecto);

        if (!etapaProyecto) {
            console.log(`etapaProyecto existente: ${etapaProyecto}`)
            return res.status(400).send(`la etapaProyecto con id: ${etapaProyecto._id}, no existe en el sistema, verifique el id`)
        };

        const nombreExistente = await EtapaProyecto.findOne({nombre: req.body.nombre, _id:{$ne: etapaProyecto._id}});
        if (nombreExistente) {
            console.log(`nombre existente: ${nombreExistente}`)
            return res.status(400).send(`el nombre ${req.body.nombre} ya existe en el sistema, pruebe con otro nombre`)
        }

        etapaProyecto.nombre = req.body.nombre;
        etapaProyecto.fechaActualizacion = new Date;

        etapaProyecto = await etapaProyecto.save();

        res.status(200).send(etapaProyecto).json();

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getEtapaProyecto, postEtapaProyecto, putEtapaProyecto};