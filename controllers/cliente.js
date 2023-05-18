const { request, response } = require('express');
const Cliente = require('../models/cliente');


// listar
const getCliente = async (req = request, res = response) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).send(clientes).json();
    } catch (error) {
        res.status(500).send(error);
    }
}

// crear
const postCliente = async (req = request, res = response) => {
    try {
        const clienteExiste = await Cliente.findOne({email: req.body.email});
        if(clienteExiste){
            return res.status(400).send(`el cliente con email ${clienteExiste} ya existe en el sistema, pruebe con otro email`)
        };

        let cliente = new Cliente();
        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fechaCreacion = new Date;
        cliente.fechaActualizacion = new Date;

        cliente = await cliente.save();

        res.status(200).send(cliente).json();
    } catch (error) {
        res.status(500).send(error);
    }
}

// actualizar
const putCliente = async (req = request, res = response) => {
    try {
        let cliente = await Cliente.findById(req.params.idCliente);

        if (!cliente) {
            return res.status(400).send(`el cliente con id: ${cliente._id}, no existe en el sistema, verifique el id`)
        };

        console.log(`cliente existente: ${cliente}`)
        const emailExistente = await Cliente.findOne({email: req.body.email, _id:{$ne: cliente._id}});
        if (emailExistente) {
            console.log(`email existente: ${emailExistente}`)
            return res.status(400).send(`el email ${req.body.email} ya existe en el sistema, pruebe con otro email`)
        }

        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fechaActualizacion = new Date;

        cliente = await cliente.save();

        res.status(200).send(cliente).json();

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getCliente, postCliente, putCliente};