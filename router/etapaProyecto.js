const { Router } = require('express')
const { getEtapaProyecto, postEtapaProyecto, putEtapaProyecto } = require('../controllers/etapaProyecto')

const router = Router()

// consultar todos
router.get('/', getEtapaProyecto);

// crear
router.post('/', postEtapaProyecto);

// actualizar
router.put('/:idEtapaProyecto', putEtapaProyecto);

module.exports = router;