const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

let Timesheetdb = {};

Timesheetdb.getAllTimesheets = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Timesheet`, (error, result) =>{
            error ? reject(error) : resolve(result);
        });
    });
};

Timesheetdb.getTimesheetById = id => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Timesheet WHERE id = $id`,
        {
            $id: id
        }, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
};

Timesheetdb.getTimesheetByEmployeeId = employeeId => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Timesheet WHERE employee_id = $employeeId`,
        {
            $employeeId: employeeId
        }, (error, result) =>{
            error ? reject(error) : resolve(result);
        });

    });
};

Timesheetdb.addTimesheet = timesheet => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO Timesheet (hours, rate, date, employee_id) 
        VALUES ($hours, $rate, $date, $employeeId)`,
        {
            $hours: timesheet.hours,
            $rate: timesheet.rate,
            $date: timesheet.date,
            $employeeId: timesheet.employeeId
        }, function(error){
            error ? reject(error) : resolve(this.lastID);
        });
    });
};

Timesheetdb.updateTimesheet = timesheet => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE Timesheet SET hours = $hours, rate = $rate, date = $date, employee_id = $employeeId 
        WHERE id = $id`,
        {
            $hours: timesheet.hours,
            $rate: timesheet.rate,
            $date: timesheet.date,
            $employeeId: timesheet.employeeId,
            $id: timesheet.id
        }, function(error){
            error ? reject(error) : resolve (timesheet);
        });
    });
};

Timesheetdb.removeTimesheet = id => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM Timesheet WHERE id = $id`, 
        {
            $id: id
        },function(error){
            error ? reject(error) : resolve(true);
        });
    });
};

module.exports = Timesheetdb;
