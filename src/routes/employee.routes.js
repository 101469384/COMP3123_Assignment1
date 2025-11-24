const router = require('express').Router();
const ctrl = require('../controllers/employee.controller');
const {
    createEmployee,
    getAllEmployees,
    deleteEmployee
} = require("../controllers/employee.controller");

const validate = require('../middlewares/validate');
const upload = require('../middlewares/upload');

router.get('/employees', ctrl.getAll);


router.post('/employees',
    upload.single("profile_image"),
    createEmployeeRules,
    validate,
    ctrl.create
);

router.get('/employees/:eid', ctrl.getById);

router.put('/employees/:eid',
    upload.single("profile_image"),
    updateEmployeeRules,
    validate,
    ctrl.update
);

router.delete("/employees/:eid", deleteEmployee);



module.exports = router;

