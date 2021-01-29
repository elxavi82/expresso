const timesheetdb = require('../../data/Timesheet/Timesheetdb');

let Timesheetdp = {};

Timesheetdp.getAllTimesheets = () =>{
    return new Promise(async(resolve, reject) =>{
        try{
            const timesheets = await timesheetdb.getAllTimesheets();
            resolve(timesheets);
        }catch(error){
            reject(error);
        }
    });
};

Timesheetdp.getTimesheetById = id =>{
    return new Promise(async(resolve, reject) =>{
        try{
            const timesheet = await timesheetdb.getTimesheetById(id);
            resolve(timesheet);
        }catch(error){
            reject(error);
        }
    });
};

Timesheetdp.getTimesheetByEmployeeId = employeeId =>{
    return new Promise(async(resolve, reject)=>{
        try{
            const timesheets = await timesheetdb.getTimesheetByEmployeeId(employeeId);
            resolve(timesheets);
        }catch(error){
            reject(error);
        }
    });
};

Timesheetdp.addTimesheet = timesheet =>{
    return new Promise(async(resolve, reject)=>{
        try{
            const hours = Number(timesheet.hours);
            const rate = Number(timesheet.rate);
            const date = Number(timesheet.date);
            const employeeId = Number(timesheet.employeeId);

            if(!hours || !rate || !date || !employeeId){
                resolve('data-incomplete');
            }else{
                const newTimesheetId = await timesheetdb.addTimesheet(timesheet);
                timesheet.id = newTimesheetId;
                resolve(timesheet);
            }
        }catch(error){
            reject(error);
        }
    });
};

Timesheetdp.updateTimesheet = timesheet =>{
    return new Promise(async(resolve, reject)=>{
        try{
            const id = timesheet.id;
            const hours = Number(timesheet.hours);
            const rate = Number(timesheet.rate);
            const date = Number(timesheet.date);
            const employeeId = Number(timesheet.employeeId);

            if(!id || !hours || !rate || !date || !employeeId){
                resolve('data-incomplete');
            }else{
                const updatedTimesheet = await timesheetdb.updateTimesheet(timesheet);
                resolve(updatedTimesheet);
            }
        }catch(error){
            reject(error);
        }
    });
};

Timesheetdp.removeTimesheet = id =>{
    return new Promise(async(resolve, reject) =>{
        try{
            const isRemoved = await timesheetdb.removeTimesheet(id);
            resolve(isRemoved);
        }catch(error){
            reject(error);
        }
    });
};

module.exports = Timesheetdp;