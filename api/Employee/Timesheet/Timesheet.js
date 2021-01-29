const express = require('express');
const timesheetRouter = express.Router({mergeParams:true});
const timesheetdp = require('../../../data-pipe/Timesheet/Timesheetdp');
module.exports = timesheetRouter;

timesheetRouter.param('timesheetId', async(req, res, next, timesheetId) =>{
    try{
        const timesheet = await timesheetdp.getTimesheetById(timesheetId);
        if(timesheet){
            req.timesheet = timesheet;
            next();
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        next(error);
    }
});


timesheetRouter.get('/', async(req, res, next)=>{
    console.log('Enters timesheet route');
    try{
        const employeeId = req.employee.id;
        console.log(employeeId);
        const timesheets = await timesheetdp.getTimesheetByEmployeeId(employeeId);
        res.status(200).json({timesheets: timesheets});
    }catch(error){
        next(error);
    }
});

timesheetRouter.post('/', async(req, res, next)=>{
    try{
        const employeeId = req.employee.id;
        const timesheet = req.body.timesheet;
        timesheet.employeeId = employeeId;
        const newTimesheet = await timesheetdp.addTimesheet(timesheet);
        res.status(200).json({timesheet: timesheet});
    }catch(error){
        next(error);
    }
});

timesheetRouter.put('/:timesheetId', async(req, res, next) =>{
    try{
        const timesheet = req.body.timesheet;
        const updatedTimesheet = await timesheetdp.updateTimesheet(timesheet);
        res.status(200).json({timesheet: updatedTimesheet});
    }catch(error){
        next(error);
    }
});

timesheetRouter.delete('/:timesheetId', async(req, res, next) =>{
    try{
        const id = req.timesheet.id;
        const isRemoved = await timesheetdp.removeTimesheet(id);
        if(isRemoved){
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        next(error);
    }
});