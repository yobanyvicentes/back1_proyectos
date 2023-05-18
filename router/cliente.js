const { Router } = require('express')
const { getCliente, postCliente, putCliente } = require('../controllers/cliente')

const router = Router()

// consultar todos
router.get('/', getCliente);

// crear
router.post('/', postCliente);

// actualizar
router.put('/:idCliente', putCliente);

module.exports = router;