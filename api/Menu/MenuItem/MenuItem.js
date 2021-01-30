const express = require('express');
const menuItemRouter = express.Router({mergeParams: true});
const menuItemdp = require('../../../data-pipe/MenuItem/MenuItemdp');
const menudp = require('../../../data-pipe/Menu/Menudp');
module.exports = menuItemRouter;

menuItemRouter.param('menuItemId', async(req, res, next, menuItemId)=>{
    try{
        const menuItem = await menuItemdp.getMenuItemById(menuItemId);
        if(!menuItem){
            res.sendStatus(404);
        }else{
            req.menuItem = menuItem;
            next();
        }
    }catch(error){
        next(error);
    }
});

menuItemRouter.get('/', async(req, res, next)=>{
    try{
        const menuId = req.menu.id;
        const menuItems = await menuItemdp.getMenuItemByMenuId(menuId);
        res.status(200).json({menuItems: menuItems});
    }catch(error){
        next(error);
    }
});

menuItemRouter.post('/', async(req, res, next)=>{
    try{
        const menu = req.menu;
        if(!menu){
            res.sendStatus(404);
        }else{
            const menuItem = req.body.menuItem;
            menuItem.menuId = req.menu.id;
            const newMenuItem = await menuItemdp.addMenuItem(menuItem);
            if(newMenuItem ==='data-incomplete'){
                res.sendStatus(400);
            }else{
                res.status(201).json({menuItem: newMenuItem});
            }
        }
    }catch(error){
        next(error);
    }
});

menuItemRouter.put('/:menuItemId', async(req, res, next) =>{
    try{
        const menu = req.menu;
        if(!menu){
            res.sendStatus(404);
        }else{
            const menuId = req.menuItem.id;
            const isRemoved = await menuItemdp.removeMenuItem(menuId);
            if(isRemoved){
                res.sendStatus(201);
            }
        }
    }catch(error){
        next(error);
    }
});

menuItemRouter.delete('/:menuItemId', async(req, res, next) =>{
    try{
        const menu = req.menu;
        if(!menu){
            res.sendStatus(404);
        }else{
            const menuItem = req.body.menuItem;
            menuItem.menuId = menu.id;
            const updatedMenuItem = await menuItemdp.updateMenuItem(menuItem);
            if(updatedMenuItem === 'data-incomplete'){
                res.sendStatus(400);
            }else{
                res.status(200).json({menuItem: updatedMenuItem});
            }
        }
    }catch(error){
        next(error);
    }
});