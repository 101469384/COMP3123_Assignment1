const Employee = require('../models/Employee');
const asyncHandler = require('../middlewares/asyncHandler');

// GET all employees
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
        department: e.department,
        profile_image: e.profile_image || null
    }));

    res.status(200).json(out);
});


// GET employee by id
exports.getById = asyncHandler(async (req, res) => {
    const { eid } = req.params;

    const emp = await Employee.findById(eid).lean();
    if (!emp) {
        return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    res.status(200).json({
        employee_id: String(emp._id),
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        position: emp.position,
        salary: emp.salary,
        date_of_joining: emp.date_of_joining,
        department: emp.department,
        profile_image: emp.profile_image || null
    });
});


// POST create employee (supports profile_image upload)
exports.create = asyncHandler(async (req, res) => {
    // req.body contains text fields
    const data = { ...req.body };

    // if image uploaded, save its path
    if (req.file) {
        data.profile_image = `/uploads/${req.file.filename}`;
    }

    const created = await Employee.create(data);

    res.status(201).json({
        message: 'Employee created successfully.',
        employee_id: String(created._id)
    });
});


// PUT update employee (supports optional new image)
exports.update = asyncHandler(async (req, res) => {
    const { eid } = req.params;

    const updateData = { ...req.body };

    if (req.file) {
        updateData.profile_image = `/uploads/${req.file.filename}`;
    }

    const emp = await Employee.findByIdAndUpdate(eid, updateData, { new: true });
    if (!emp) {
        return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee details updated successfully.' });
});


// DELETE employee
exports.remove = asyncHandler(async (req, res) => {
    const { eid } = req.params;

    const emp = await Employee.findByIdAndDelete(eid);
    if (!emp) {
        return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    res.status(204).send();
});




exports.search = asyncHandler(async (req, res) => {
    const { department, position } = req.query;

    if (!department && !position) {
        return res.status(400).json({
            status: false,
            message: "Please provide department or position to search."
        });
    }

    const filter = {};
    if (department) filter.department = new RegExp(department, "i");
    if (position) filter.position = new RegExp(position, "i");

    const list = await Employee.find(filter).lean();

    const out = list.map(e => ({
        employee_id: String(e._id),
        first_name: e.first_name,
        last_name: e.last_name,
        email: e.email,
        position: e.position,
        salary: e.salary,
        date_of_joining: e.date_of_joining,
        department: e.department,
        profile_image: e.profile_image || null
    }));

    res.status(200).json(out);
});

