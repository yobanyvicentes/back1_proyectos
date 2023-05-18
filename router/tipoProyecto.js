const { Router } = require('express')
const { getTipoProyecto, postTipoProyecto, putTipoProyecto } = require('../controllers/tipoProyecto')

const router = Router()

// consultar todos
router.get('/', getTipoProyecto);

// crear
router.post('/', postTipoProyecto);

// actualizar
router.put('/:idTipoProyecto', putTipoProyecto);

module.exports = router;
