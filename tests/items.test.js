const { describe, it, test, expect } = require("@jest/globals");
const Item = require("../server/models/item");
const 

/*
"name":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
       "price":109.95,
       "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
       "category":"men's clothing",
       "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
*/

describe("Unit tests for item routes", () => {

   /* beforeEach(() => {
        db.sync();
    }); */

    test("get all 20 seed items", async () => {
        const item = await Item.findAll();
        expect(item.length).toBe(20);
    });

    test("create a new item", async () => {
        const allItems = await Item.findAll();
        const newItem = await Item.create({name: "testItem", price: 100.00, description: "This is a test item", category: "category", image: "url link"});
        allItems.push(newItem);
        expect(allItems).toContain(newItem);
    });

    test("delete an item", async () => {
        const allItems = await Item.findAll();
        const toDeleteItem = await Item.findByPk(1);
        const deletedItem = await Item.destroy({where: {id: 1}});
        expect(allItems).not.toContain(toDeleteItem);
    });
});
