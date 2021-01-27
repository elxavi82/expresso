const menudb = require('../../data/Menu/Menudb');

let Menudp = {};

Menudp.getAllMenus = () =>{
    return new Promise(async(resolve, reject) => {
        try{
            const menus = await menudb.getAllMenus();
            resolve(menus);
        }catch(error){
            reject(error);
        }
    });
};

Menudp.getMenuById = id => {
    return new Promise(async(resolve, reject) =>{
        try{
            const menu = await menudb.getMenuById(id);
            resolve(menu);
        }catch(error){
            reject(error);
        }
    });
};

Menudp.addMenu = menu => {
    return new Promise(async(resolve, reject) =>{
        try{
            const title = menu.title;
            if(!title){
                resolve('data-incomplete');
            }else{
                const newMenuId = await menudb.addMenu(menu);
                menu.id = newMenuId;
                resolve(menu);
            }
        }catch(error){
            reject(error);
        }
    });
};

Menudp.updateMenu = menu =>{
    return new Promise(async(resolve, reject) =>{
        try{
            const id = menu.id;
            const title = menu.title;
            if(!id || !title){
                resolve('data-incomplete');
            }else{
                const updatedMenu = await menudb.updateMenu(menu);
                resolve(updatedMenu);
            }
        }catch(error){
            reject(error);
        }
    });
};

Menudp.removeMenu = id => {
    return new Promise(async(resolve, reject) =>{
        try{
            const isRemoved = await menudb.removeMenu(id);
            resolve(isRemoved);
        }catch(error){
            reject(error);
        }
    });
};
module.exports = Menudp;