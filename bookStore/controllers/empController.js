const { name } = require('ejs');
const emp = require('../models/employeeModel');

const empPage = async (req, res) => {

    const records = await emp.find({});

    // console.log(records);

    res.render('employee', { records })
}

const insertEMP = async (req, res) => {
    console.log(req.body);

    const insert = await emp.create(req.body);

    if (insert) {
        console.log('EMP record inserted...', insert);
    } else {
        console.log('EMP record not insertion...', insert);
    }

    res.redirect('/employee');
}

const deleteEMP = async (req, res) => {
    const id = req.query.id;
    console.log(id);

    await emp.findByIdAndDelete(id);

    res.redirect('/employee');
}

const updateEMP = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const record = await emp.findById(id);

    // await emp.findByIdAndDelete(id);

    res.render('updateEmp', { record });
}

const editEMP = async (req, res) => {
    const id = req.params.id;

    await emp.findByIdAndUpdate(id, req.body);

    res.redirect('/employee');
}

module.exports = {
    empPage,
    insertEMP,
    deleteEMP,
    updateEMP,
    editEMP,
}