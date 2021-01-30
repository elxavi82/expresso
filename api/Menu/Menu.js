const express = require('express');
const menuRouter = express.Router();
const menudp = require('../../data-pipe/Menu/Menudp');
const menuItemdp = require('../../data-pipe/MenuItem/MenuItemdp');
const menuItemRouter = require('./MenuItem/MenuItem');
module.exports = menuRouter;

menuRouter.use('/:menuId/menu-items', menuItemRouter);

menuRouter.param('menuId', async(req, res, next, menuId)=>{
    try{
        const menu = await menudp.getMenuById(menuId);
        if(menu){
            req.menu = menu;
            next();
        }else{
            res.sendStatus(404);
        }
        
    }catch(error){
        next(error);
    }
});

menuRouter.get('/', async(req, res, next)=>{
    try{
        const menus = await menudp.getAllMenus();
        res.status(200).json({menus: menus});
    }catch(error){
        next(error);
    }
});

menuRouter.get('/:menuId', async(req, res, next)=>{
    try{
        const menu = req.menu;
        res.status(200).json({menu: menu});
    }catch(error){
        next(error);
    }
});

menuRouter.post('/', async(req, res, next)=>{
    try{
        const menu = req.body.menu;
        const newMenu = await menudp.addMenu(menu);
        if(newMenu === 'data-incomplete'){
            res.sendStatus(400);
        }else{
            res.status(201).json({menu: newMenu});
        }
    }catch(error){
        next(error);
    }
});

menuRouter.put('/:menuId', async(req, res, next)=>{
    try{
        const id = req.menu.id;
        const menu = req.body.menu;
        const menuUpdated = await menudp.updateMenu(menu);
        if(menuUpdated === 'data-incomplete'){
            res.sendStatus(400);
        }else{
            res.json({menu: menuUpdated});
        }
    }catch(error){
        next(error);
    }
});

menuRouter.delete('/:menuId', async(req, res, next)=>{
    try{
        const id = req.menu.id;
        const menuItems = await menuItemdp.getMenuItemByMenuId(id);
        if(menuItems.length > 0){
            res.sendStatus(400);
        }else{
            const isRemoved = await menudp.removeMenu(id);
            if(isRemoved){
                res.sendStatus(204);
            }
        }
    }catch(error){
        next(error);
    }
});