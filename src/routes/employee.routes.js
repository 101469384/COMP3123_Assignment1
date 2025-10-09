const router = require('express').Router();
const ctrl = require('../controllers/employee.controller');
const { createEmployeeRules, updateEmployeeRules, deleteEmployeeRules } = require('../validators/employee.validators');
const validate = require('../middlewares/validate');

router.get('/employees', ctrl.getAll);
router.post('/employees', createEmployeeRules, validate, ctrl.create);
router.get('/employees/:eid', ctrl.getById);
router.put('/employees/:eid', updateEmployeeRules, validate, ctrl.update);
router.delete('/employees', deleteEmployeeRules, validate, ctrl.remove); // ?eid=xxx

module.exports = router;
