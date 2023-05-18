const {Schema, model } = require('mongoose');

const EtapaProyectoSchema = Schema({
    nombre: {
        type : String,
        require : [true, 'El nombre es requerido']
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('EtapaProyecto', EtapaProyectoSchema);