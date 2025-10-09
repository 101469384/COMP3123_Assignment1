const Employee = require('../models/Employee');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
    const list = await Employee.find().lean();
    const out = list.map(e => ({
        employee_id: String(e._id),
        first_name: e.first_name,
        last_name: e.last_name,
        email: e.email,
        position: e.position,
        salary: e.salary,
        date_of_joining: e.date_of_joining,
        department: e.department
    }));
    res.status(200).json(out);
});

exports.create = asyncHandler(async (req, res) => {
    const emp = await Employee.create(req.body);
    res.status(201).json({
        message: 'Employee created successfully.',
        employee_id: emp.id
    });
});

exports.getById = asyncHandler(async (req, res) => {
    const { eid } = req.params;
    const emp = await Employee.findById(eid);
    if (!emp) return res.status(404).json({ status: false, message: 'Employee not found' });
    res.status(200).json(emp.toJSON());
});

exports.update = asyncHandler(async (req, res) => {
    const { eid } = req.params;
    const emp = await Employee.findByIdAndUpdate(eid, req.body, { new: true });
    if (!emp) return res.status(404).json({ status: false, message: 'Employee not found' });
    res.status(200).json({ message: 'Employee details updated successfully.' });
});

exports.remove = asyncHandler(async (req, res) => {
    const { eid } = req.query;
    const emp = await Employee.findByIdAndDelete(eid);
    if (!emp) return res.status(404).json({ status: false, message: 'Employee not found' });
    res.status(204).send(); // change to 200 + body if your prof requires a JSON message
});
