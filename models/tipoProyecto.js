const { Schema, model} = require('mongoose');

const TipoProyectoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date(),
    },
    fechaActualizacion: {
        type: Date,
        default: new Date(),
    },
});

module.exports = model('TipoProyecto', TipoProyectoSchema);
