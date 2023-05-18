
const TipoProyecto = require('../models/tipoProyecto');

// listar
const getTipoProyecto = async (req, res) => {
    try {
        const tipoProyectos = await TipoProyecto.find();
        res.status(200).send(tipoProyectos).json();
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

// crear
const postTipoProyecto = async (req, res) => {
    try {
        const tipoProyectoExiste = await TipoProyecto.findOne({ nombre: req.body.nombre }).exec();
        if(tipoProyectoExiste){
            return res.status(400).send(`la tipoProyecto con nombre ${tipoProyectoExiste} ya existe en el sistema, pruebe con otro nombre`)
        };

        let tipoProyecto = new TipoProyecto();
        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fechaCreacion = new Date;
        tipoProyecto.fechaActualizacion = new Date;

        tipoProyecto = await tipoProyecto.save();

        res.status(200).send(tipoProyecto).json();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

// actualizar
const putTipoProyecto = async (req = request, res = response) => {
    try {
        let tipoProyecto = await TipoProyecto.findById(req.params.idTipoProyecto);

        if (!tipoProyecto) {
            console.log(`tipoProyecto existente: ${tipoProyecto}`)
            return res.status(400).send(`el tipoProyecto con id: ${tipoProyecto._id}, no existe en el sistema, verifique el id`)
        };

        const nombreExistente = await TipoProyecto.findOne({nombre: req.body.nombre, _id:{$ne: tipoProyecto._id}});
        if (nombreExistente) {
            console.log(`nombre existente: ${nombreExistente}`)
            return res.status(400).send(`el nombre ${req.body.nombre} ya existe en el sistema, pruebe con otro nombre`)
        }

        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fechaActualizacion = new Date;

        tipoProyecto = await tipoProyecto.save();

        res.status(200).send(tipoProyecto).json();

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getTipoProyecto, postTipoProyecto, putTipoProyecto};