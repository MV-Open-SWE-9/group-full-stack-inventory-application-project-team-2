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

module.exports = router;
