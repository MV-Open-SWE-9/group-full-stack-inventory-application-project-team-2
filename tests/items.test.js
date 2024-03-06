import "regenerator-runtime/runtime"
const { describe, it, test, expect } = require("@jest/globals");
const { items } = require("../server/seedData.js"); 
const Item = require("../server/models/item.js");
const {sequelize} = require('../server/db.js');
// ================ Paul M additions (delete after review) ================ 
const request = require('supertest');
const { app } = require("../public/react/components/App.jsx")


/*
"name":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
       "price":109.95,
       "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
       "category":"men's clothing",
       "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
*/

describe("Unit tests for item routes", () => {

    beforeEach(async () => {
        await sequelize.sync({force:true});
        await Promise.all(items.map(item => Item.create(item)));

    });

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

    test("update an item", async () => {
        const updatedItemData = {
            name: "test item",
            price: 10.00,
            description: "Updated Item Test",
            category: "Updated Test Category",
            image: "Updated Test Image URL"
        };
        const itemToUpdate = await Item.findByPk(1);
        await Item.update(updatedItemData, { where: { id: 1 } });
        const updatedItem = await Item.findByPk(1); 
        expect(updatedItem.name).toEqual(updatedItemData.name);
        expect(updatedItem.price).toEqual(updatedItemData.price);
        expect(updatedItem.description).toEqual(updatedItemData.description);
        expect(updatedItem.category).toEqual(updatedItemData.category);
        expect(updatedItem.image).toEqual(updatedItemData.image);
    });

    test("get single item", async () => {
        const expectedItemId = 1;
        const expectedItem = await Item.findByPk(expectedItemId);
        const res = await request(app).get(`${apiURL}/items/${expectedItemId}`); // == not to sure on filepath 
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject(expectedItem.toJSON()); 
    });
});
