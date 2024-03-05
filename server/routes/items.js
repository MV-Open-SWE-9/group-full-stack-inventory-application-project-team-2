const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// GET all item
router.get("/", async (req, res, next) => {
  try {
    const item = await Item.findAll();
    res.send(item);
  } catch (error) {
    next(error);
  }
});

// GET single item
router.get("/:id", async (req, res, next) => {
    try{
        const item = await Item.findByPk(req.params.id);
        res.json(item);
    } catch (error){
        next(error);
    }
});

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

module.exports = router;
