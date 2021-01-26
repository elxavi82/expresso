const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

let Employeedb = {};

Employeedb.getAllEmployees = () =>{
    return new Promise((resolve, reject) =>{
        db.all(`SELECT * FROM Employee WHERE is_current_employee = 1`, (error, result) =>{
            error ? reject(error) : resolve(result);
        });
    });
};

Employeedb.getEmployeeById = id =>{
    return new Promise((resolve, reject)=>{
        db.get(`SELECT * FROM Employee WHERE id = $id`, {
            $id: id
        }, (error, result) =>{
            error ? reject(error) : resolve(result);
        });
    });
};

Employeedb.addEmployee = employee =>{
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO Employee (name, position, wage, is_current_employee)
        VALUES ($name, $position, $wage, $isCurrentEmployee)`,
        {
            $name: employee.name,
            $position: employee.position,
            $wage: employee.wage,
            $isCurrentEmployee: employee.isCurrentEmployee
        }, function(error){
            error ? reject(error) : resolve(this.lastID);
        });
    });
};

Employeedb.updateEmployee = employee =>{
    return new Promise((resolve, reject) =>{
        db.run(`UPDATE Employee SET name = $name, position = $position,
        wage = $wage, is_current_employee = $isCurrentEmployee WHERE id = $id`, 
        {
            $name: employee.name,
            $position: employee.position,
            $wage: employee.wage,
            $isCurrentEmployee: employee.isCurrentEmployee,
            $id: employee.id
        }, function(error){
            error ? reject(error) : resolve(employee);
        });
    });
};

Employeedb.removeEmployee = id => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE Employee SET is_current_employee = 0 WHERE id = $id`,
        {
            $id: id
        }, function(error){
            error ? reject(error) : resolve(this.lastID); 
        });
    });
};

module.exports = Employeedb;