const employeedb = require('../../data/Employee/Employeedb');

let Employeedp = {};

Employeedp.getAllEmployees = () => {
    return new Promise(async(resolve, reject) =>{
        try{
            const employees = await employeedb.getAllEmployees();
            resolve(employees);
        }catch(error){
            reject(error);
        }
    });
};

Employeedp.getEmployeeById = id =>{
    return new Promise(async(resolve, reject) =>{
        try{
            const employee = await employeedb.getEmployeeById(id);
            resolve(employee);
        }catch(error){
            reject(error);
        }
    });
};

Employeedp.addEmployee = employee =>{
    return new Promise(async(resolve, reject) =>{
        try{
            const name = employee.name;
            const position = employee.position;
            const wage = employee.wage;

            if(!name || !position || !wage){
                resolve('data-incomplete');
            }else{
                const employeeId = await employeedb.addEmployee(employee);
                employee.id = employeeId;
                employee.isCurrentEmployee = 1;
                resolve(employee);
            }
        }catch(error){
            reject(error);
        }
    });
};

Employeedp.updateEmployee = employee =>{
    return new Promise(async(resolve, reject) =>{
        try{
            const id = employee.id;
            const name = employee.name;
            const position = employee.position;
            const wage = employee.wage;

            if(!id || !name || !position || !wage){
                resolve('data-incomplete');
            }else{
                const updatedEmployee = await employeedb.updateEmployee(employee);
                resolve(updatedEmployee);
            }
        }catch(error){
            reject(error);
        }
    });
};

Employeedp.removeEmployee = id => {
    return new Promise(async(resolve, reject) => {
        try{
            const iremovedId = await employeedb.removeEmployee(id);
            resolve(removedId);
        }catch(error){
            reject(error);
        }
    });
};

module.exports = Employeedp;