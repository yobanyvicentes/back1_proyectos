const { Router } = require('express')
const { getProyecto, postProyecto, putProyecto } = require('../controllers/proyecto')

const router = Router()

// consultar todos
router.get('/', getProyecto);

// crear
router.post('/', postProyecto);

// actualizar
router.put('/:idProyecto', putProyecto);

module.exports = router;