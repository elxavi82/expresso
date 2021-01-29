const express = require('express');
const employeeRouter = express.Router();
const employeedp = require('../../data-pipe/Employee/Employeedp');
const timesheetRouter = require('./Timesheet/Timesheet');
module.exports = employeeRouter;

employeeRouter.use('/:employeeId/timesheets', timesheetRouter);

employeeRouter.param('employeeId', async(req, res, next, employeeId) =>{
    try{
        const employee = await employeedp.getEmployeeById(employeeId);
        if(!employee){
            res.sendStatus(404);
        }else{
            req.employee = employee;
            next();
        }
    }catch(error){
        next(error);
    }
});

employeeRouter.get('/', async(req, res, next)=>{
    try{
        const employees = await employeedp.getAllEmployees();
        res.status(200).json({employees: employees});
    }catch(error){
        next(error);
    }
});

employeeRouter.get('/:employeeId', async(req, res, next)=>{
    try{
        const id = Number(req.employee.id);
        const employee = await employeedp.getEmployeeById(id);
        res.status(200).json({employee: employee});
    }catch(error){
        next(error);
    }
});

employeeRouter.post('/', async(req, res, next) =>{
    try{
        const employee = req.body.employee;
        const newEmployee = await employeedp.addEmployee(employee);
        if(newEmployee === 'data-incomplete'){
            res.sendStatus(400);
        }else{
            res.status(200).json({employee: newEmployee});
        }
    }catch(error){
        next(error);
    }
});

employeeRouter.put('/:employeeId', async(req, res, next)=>{
    try{
        const employee = req.body.employee;
        const updatedEmployee = await employeedp.updateEmployee(employee);
        if(updatedEmployee === 'data-incomplete'){
            res.sendStatus(400);
        }else{
            res.status(200).json({employee: updatedEmployee});
        }

    }catch(error){
        next(error);
    }
});

employeeRouter.delete('/:employeeId', async(req, res, next) =>{
    try{
        const id = req.employee.id;
        const isRemoved = await employeedp.removeEmployee(id);
        if(isRemoved){
            res.sendStatus(200);
        }
    }catch(error){
        next(error);
    }
});



