const menuItemdb = require('../../data/MenuItem/MenuItemdb');

let MenuItemdp = {};

MenuItemdp.getAllMenuItems = () => {
    return new Promise(async(resolve, reject) =>{
        try{
            const menuItems = await menuItemdb.getAllMenuItems();
            resolve(menuItems);
        }catch(error){
            reject(error);
        }
    });
};

MenuItemdp.getMenuItemById = id => {
    return new Promise(async(resolve, reject) =>{
        try{
            const menuItem = await menuItemdb.getMenuItemById(id);
            resolve(menuItem);
        }catch(error){
            reject(error);
        }
    });
};

MenuItemdp.getMenuItemByMenuId = menuId => {
    return new Promise(async(resolve, reject)=>{
        try{
            const menuItems = await menuItemdb.getMenuItemByMenuId(menuId);
            resolve(menuItems);
        }catch(error){
            reject(error);
        }
    });
};

MenuItemdp.addMenuItem = menuItem => {
    return new Promise(async(resolve, reject) => {
        try{
            const name = menuItem.name;
            const description = menuItem.description;
            const inventory = Number(menuItem.inventory);
            const price = Number(menuItem.price);
            const menuId = Number(menuItem.menuId);

            if(!name || !description || !inventory || !price || !menuId){
                resolve('data-incomplete');
            }else{
                const newMenuItemId = await menuItemdb.addMenuItem(menuItem);
                menuItem.id = newMenuItemId;
                resolve(menuItem);
            }

        }catch(error){
            reject(error);
        }
    });
};

MenuItemdp.updateMenuItem = menuItem =>{
    return new Promise(async(resolve, reject) => {
        try{
            const id = menuItem.id;
            const name = menuItem.name;
            const description = menuItem.description;
            const inventory = Number(menuItem.inventory);
            const price = Number(menuItem.price);
            const menuId = Number(menuItem.menuId);
            if(!id || !name || !description || !inventory || !price || !menuId){
                resolve('data-incomplete');
            }else{
                const updatedMenuItem = await menuItemdb.updateMenuItem(menuItem);
                resolve(updatedMenuItem);
            }
        }catch(error){
            reject(error);
        }
    });
};

MenuItemdp.removeMenuItem = id =>{
    return new Promise(async(resolve, reject) => {
        try{
            const isRemoved = await menuItemdb.removeMenuItem(id);
            resolve(isRemoved);
        }catch(error){
            reject(error);
        }
    });
};


module.exports = MenuItemdp;