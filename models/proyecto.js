const { Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'Numero requerido'],
        unique: [true, 'Proyecto creado']
    },
    titulo: {
        type: String,
        required: [true, 'titulo requerido']
    },
    fechaIniciacion: {
        type: Date,
        required: [true, 'la fecha de inicio es obligatoria']
    },
    fechaEntrega: {
        type: Date,
        required: [true, 'la fecha de entrega es obligatoria']
    },
    valor : {
        type : Number,
        required: [true, 'el valor es obligatorio']
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    universidad: {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    },
    etapaProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'EtapaProyecto',
        required: true
    }
});

module.exports = model('Proyecto', ProyectoSchema)
