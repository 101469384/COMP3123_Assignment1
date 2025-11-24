const { body, param, query } = require('express-validator');

const createEmployeeRules = [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('position').notEmpty(),
    body('salary').isFloat({ gt: 0 }).withMessage('salary must be > 0'),
    body('date_of_joining').isISO8601().withMessage('date_of_joining must be ISO date'),
    body('department').notEmpty()
];

const updateEmployeeRules = [
    param('eid').isMongoId().withMessage('valid eid is required in path'),
    body().custom(b => {
        const allowed = [
            "first_name","last_name","email","position",
            "salary","date_of_joining","department",
            "profile_image"
        ];
        const keys = Object.keys(b);
        if (keys.length === 0) throw new Error('provide at least one field to update');
        for (const k of keys) if (!allowed.includes(k)) throw new Error(`invalid field: ${k}`);
        return true;
    }),
    body('email').optional().isEmail(),
    body('salary').optional().isFloat({ gt: 0 }),
    body('date_of_joining').optional().isISO8601()
];

const deleteEmployeeRules = [
    query('eid').isMongoId().withMessage('eid query param is required & must be a valid id')
];

module.exports = { createEmployeeRules, updateEmployeeRules, deleteEmployeeRules };
