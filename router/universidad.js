const { Router } = require('express')
const { getUniversidad, postUniversidad, putUniversidad } = require('../controllers/universidad')

const router = Router()

// consultar todos
router.get('/', getUniversidad);

// crear
router.post('/', postUniversidad);

// actualizar
router.put('/:idUniversidad', putUniversidad);

module.exports = router;