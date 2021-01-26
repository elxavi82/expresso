const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

let MenuItemdb = {};

MenuItemdb.getAllMenuItems = () => {
    return new Promise((resolve, reject) =>{
        db.all(`SELECT * FROM MenuItem`, (error, result) =>{
            error ? reject(error) : resolve(result);
        });
    });
};

MenuItemdb.getMenuItemById = id =>{
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM MenuItem WHERE id = $id`,
        {
            $id: id
        }, (error, result) =>{
            error ? reject(error) : resolve(result);
        });
    });
};

MenuItemdb.getMenuItemByMenuId = menuId => {
    return new Promise((resolve, reject) =>{
        db.all(`SELECT * FROM MenuItem WHERE menu_id = $menuId`,
        {
            $menuId: menuId
        }, (error, result)=>{
            error ? reject(error) : resolve(result);
        });
    });
};

MenuItemdb.addMenuItem = menuItem => {
    return new Promise((resolve, reject) =>{
        db.run(`INSERT INTO MenuItem (name, description, inventory, price, menu_id) 
        VALUES ($name, $description, $inventory, $price, $menuId)`, 
        {
            $name: menuItem.name,
            $description: menuItem.description,
            $inventory: menuItem.inventory,
            $price: menuItem.price,
            $menuId: menuItem.menuId
        }, function(error){
            error ? reject(error) : resolve(this.lastID);
        });
    });
};

MenuItemdb.updateMenuItem = menuItem =>{
    return new Promise((resolve, reject) =>{
        db.run(`UPDATE MenuItem SET name = $name, description = $description, inventory = $inventory, 
        price = $price, menu_id = $menuId WHERE id = $id`,
        {
            $name: menuItem.name,
            $description: menuItem.description,
            $inventory: menuItem.inventory,
            $price: menuItem.price,
            $menuId: menuItem.menuId,
            $id: menuItem.id
        }, function(error){
            error ? reject(error) : resolve(menuItem);
        });
    });
};

MenuItemdb.removeMenuItem = id => {
    return new Promise((resolve, reject) =>{
        db.run(`DELETE FROM MenuItem WHERE id = $id`,
        {
            $id: id
        });
    }, function(error){
        error ? reject(error) : resolve (true);
    });
};

module.exports = MenuItemdb;