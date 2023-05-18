const { request, response } = require('express');
const  Universidad = require('../models/universidad');


// listar
const getUniversidad = async (req = request, res = response) => {
    try {
        const universidades = await Universidad.find();
        res.status(200).send(universidades).json();
    } catch (error) {
        res.status(500).send(error);
    }
}

// crear
const postUniversidad = async (req = request, res = response) => {
    try {
        const universidadExiste = await Universidad.findOne({telefono: req.body.telefono});
        console.log(`universidad existe ${universidadExiste}`)
        if(universidadExiste){
            return res.status(400).send(`la universidad con este teléfono ${req.body.telefono} ya existe en el sistema, pruebe con otro teléfono`)
        };

        let universidad = new Universidad();
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date;
        universidad.fechaActualizacion = new Date;

        universidad = await universidad.save();

        res.status(200).send(universidad).json();
    } catch (error) {
        res.status(500).send(error);
    }
}

// actualizar
const putUniversidad = async (req = request, res = response) => {
    try {
        let universidad = await Universidad.findById(req.params.idUniversidad);
        if (!universidad) {
            return res.status(400).send(`la universidad con id: ${universidad._id}, no existe en el sistema, verifique el id`)
        };

        console.log(`universidad existente: ${universidad}`)
        const telefonoExistente = await Universidad.findOne({telefono: req.body.telefono, _id:{$ne: universidad._id}});
        if (telefonoExistente) {
            console.log(`telefono existente en otra universidad: ${telefonoExistente}`)
            return res.status(400).send(`el telefono ${req.body.telefono} ya existe en el sistema, pruebe con otro telefono`)
        }

        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaActualizacion = new Date;

        universidad = await universidad.save();

        res.status(200).send(universidad).json();

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getUniversidad, postUniversidad, putUniversidad};