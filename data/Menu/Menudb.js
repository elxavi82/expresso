const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

let Menudb = {};

Menudb.getAllMenus = () =>{
    return new Promise((resolve, reject) =>{
        db.all(`SELECT * FROM Menu`, (error, result) =>{
            error ? reject(error) : resolve(result);
        });
    });
};

Menudb.getMenuById = id =>{
    return new Promise((resolve, reject) =>{
        db.get(`SELECT * FROM Menu WHERE id = $id`, 
        {
            $id: id
        }, (error, result) =>{
            error ? reject(error) : resolve(result);
        });
    });
};

Menudb.addMenu = menu =>{
    return new Promise((resolve, reject) =>{
        db.run(`INSTERT INTO Menu (title) VALUES ($title)`,
        {
            $title: menu.title
        }, function(error){
            error ? reject(error) : resolve(this.lastID);
        });
    });
};

Menudb.updateMenu = menu =>{
    return new Promise((resolve, reject) =>{
        db.run(`UPDATE Menu SET title = $title WHERE id = $id`,
        {
            $title: menu.title,
            $id: menu.id
        }, function(error){
            error ? reject(error) : resolve(menu);
        });
    });
};

Menudb.removeMenu = id =>{
    return new Promise((resolve, reject) =>{
        db.run(`DELETE FROM Menu WHERE id = $id`,
        {
            $id: id
        }, function(error){
            error ? reject(error) : resolve(true);
        });
    });
};

module.exports = Menudb;