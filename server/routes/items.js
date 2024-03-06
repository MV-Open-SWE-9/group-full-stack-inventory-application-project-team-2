const express = require("express");
const router = express.Router();
const Item = require("../models/item");

/*--------------------GET All Items------------------------------------*/
router.get("/", async (req, res, next) => {
  try {

    const item = await Item.findAll();
    res.send(item);

  } catch (error) {
    next(error);
  }
});

/*--------------------Get a Single Item------------------------------------*/
router.get("/:id", async (req, res, next) => {
  try{

    const item = await Item.findByPk(req.params.id);
    res.json(item);

   }catch (error){
      next(error);
  }
});

/*--------------------Create a New Item------------------------------------*/
router.post("/", async (req, res, next) => {
  try{

    const item = await Item.create(req.body);

    if(!item){
      throw new Error("Problem in item router POST");
    }

    res.send(item);

  }catch(error){
    next(error);
  }
});

/*--------------------Delete a Single Item------------------------------------*/
router.delete('/:id', async (req, res, next) => {

  try{

    await Item.destroy({
      where : {id: req.params.id}
    });

    const item = await Item.findAll();
    res.send(item);

  } catch (error) {
    next(error);
  }
});

/*--------------------Update a Single Item------------------------------------*/
router.put('/:id', async (req, res, next) => {
  try{

    const updateItem = await Item.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if(!updateItem){
      throw new Error('error updating item in items put route')
    }

    const allItems = await Item.findAll();

    if(!allItems){
      throw new Error('Error getting all items in items put route');
    }
    
    res.send(allItems);

  }catch(error){
    next(error);
  }
});

module.exports = router;
