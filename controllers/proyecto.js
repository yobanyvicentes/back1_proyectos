const { request, response } = require('express');
const  Proyecto  = require('../models/proyecto');

// listar
const getProyecto = async (req = request, res = response) => {
    try {
        const proyectos = await Proyecto.find().populate([
            {
                path: 'etapaProyecto', select: 'nombre'
            },
            {
                path: 'tipoProyecto', select: 'nombre'
            },
            {
                path: 'cliente', select: 'nombre'
            },
            {
                path: 'universidad', select: 'nombre'
            }
        ]);;
        res.status(200).send(proyectos).json();
    } catch (error) {
        res.status(500).send(error);
    }
}

// crear
const postProyecto = async (req = request, res = response) => {
    try{
        //extraer las llaves foraneas
        const proyectoExiste = await Proyecto.findOne({ numero: req.body.numero });
        if (proyectoExiste) {
            return res.status(400).send(`el proyecto con número ${proyectoExiste} ya existe en el sistema, pruebe con otro número`)
        };

        let proyecto = new Proyecto();
        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.etapaProyecto = req.body.etapaProyecto._id;
        proyecto.cliente = req.body.cliente._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.fechaCreacion = new Date;
        proyecto.fechaActualizacion = new Date;

        proyecto = await proyecto.save();

        res.status(200).send(proyecto).json();
        //res.status(200).send(data).json();
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}

// actualizar
const putProyecto = async (req = request, res = response) => {
    try {
        let proyecto = await Proyecto.findById(req.params.idProyecto);

        if (!proyecto) {
            console.log(`proyecto existente: ${proyecto}`)
            return res.status(400).send(`el proyecto con id: ${proyecto._id}, no existe en el sistema, verifique el id`)
        };

        const numeroExistente = await Proyecto.findOne({ numero: req.body.numero, _id: { $ne: proyecto._id } });
        if (numeroExistente) {
            console.log(`numero existente: ${numeroExistente}`)
            return res.status(400).send(`el número ${req.body.numero} ya existe en el sistema, pruebe con otro número`)
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.etapaProyecto = req.body.etapaProyecto._id;
        proyecto.cliente = req.body.cliente._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.fechaActualizacion = new Date;

        proyecto = await proyecto.save();

        res.status(200).send(proyecto).json();

    } catch (error) {
        res.status(500).send({msg : error}).json();
    }
}

module.exports = { getProyecto, postProyecto, putProyecto };