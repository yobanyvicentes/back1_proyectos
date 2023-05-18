const {Schema, model} = require('mongoose');

const UniversidadSchema = Schema({
    nombre: {
        type : String,
        require : [true, 'El nombre es requerido']
    },
    direccion : {
        type : String,
        require : [true, 'La dirección es requerida']
    },
    telefono : {
        type: String,
        require : [true, 'El telefono es requerido']
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

module.exports = model('Universidad' , UniversidadSchema);