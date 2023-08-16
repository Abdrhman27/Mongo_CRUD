const Employee = require("../model/Employee");

const getAllEmployees = async (req,res)  => {
    const employees = await Employee.find();
    if(!employees) return res.status(204).json({"message": "No employees found."});
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if(!req?.body?.firsname || !req?.body?.lastname) return res.status(400).json({"message": "Firstname and lastname are required"});
    try {
        const result = await Employee.create({firsname: req.body.firsname, lastname: req.body.lastname});
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({"message": "Id param is required."});
    const employee = await Employee.findOne({_id: Number(req.body.id)}).exec();
    if(!employee) {
        return res.status(400).json({"message": `No employee matches ID \"${req.body.id}\".`});
    }
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;
    const result = employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if(req?.body?.id) return res.status(400).json({"message": "Employee ID is required."});
    const employee = Employee.findOne({_id: Number(req.body.id)}).exec();
    if(!employee) {
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }
    const result = await Employee.deleteOne({_id: req.body.id});
    res.json(result);
}

const getEmployee = (req, res) => {
    if(req?.params?.id) return res.status(400).json({"message": "Employee ID is required."});
    const employee = Employee.findOne({_id: Number(req.params.id)}).exec();
    if(!employee) {
        return res.status(400).json({"message": `Employee ID ${req.params.id} not found`});
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees, getEmployee, createNewEmployee, updateEmployee, deleteEmployee
} 