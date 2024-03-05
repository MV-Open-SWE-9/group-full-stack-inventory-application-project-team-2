/*--------------------Required Imports------------------------------------*/
import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { ItemsList } from './ItemsList';
import {Item} from './Item';
import { ItemForm } from './ItemForm';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	/*--------------------React State variables------------------------------------*/
	const [allItems, setAllItems] = useState([]);
	const [singleItem, setSingleItem] = useState({});
	const [viewSingleItem, setViewSingleItem] = useState(false);
	const [viewCreateItemForm, setViewCreateItemForm] = useState(false);
	const [newItem, setNewItem] = useState({
		name: "",
		description: "",
		price: 0,
		category: "",
		image: ""
	});

/*----------------------CRUD function handlers----------------------------------*/

	/*----------------------Get All Items in DB----------------------------------*/
	async function fetchAllItems(){
		
		try{

			const res = await fetch(`${apiURL}/items`);
			const itemData = await res.json();
			
			setAllItems(itemData);

		}catch(error){
			console.log("Error in fetchAllItems");
		}
	};

	/*----------------------Get Single Item----------------------------------*/
	async function fetchSingleItem(id){

		try {

			const res = await fetch(`${apiURL}/items/${id}`);
			const itemData = await res.json();

			setSingleItem(itemData);
			setViewSingleItem(true);

		}catch(error){
			console.log("Error in fetching one item");
		}
	};

	/*----------------------Delete Single Item----------------------------------*/
	async function deleteSingleitem(id){
		try{

			const response = await fetch(`${apiURL}/items/${id}`, {
			method: "DELETE"
			});

			fetchAllItems();
			setViewSingleItem(false);

		}catch(error){
			console.log("Error in React App deleteSingleitem");
		}
	  };

	/*----------------------Create New Item----------------------------------*/
	async function createNewItem() {
		try{

			const res = await fetch(`${apiURL}/items`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newItem)
			});
		
			const data = res.json();
			setAllItems([
				...allItems, newItem
			]);
			setNewItem({
				name: "",
				description: "",
				price: 0,
				category: "",
				image: ""
			});

		}catch(error){
			console.log("Error in createNewItem");
		}
	}

	/*----------------------CRUD Button Handlers----------------------------------*/

	function itemClickHandler(e){
		e.preventDefault();
		fetchSingleItem(e.currentTarget.value);
	}

	function backClickHandler(e){
		e.preventDefault();
		setViewSingleItem(false);
		setSingleItem({});
	}
	
	function newItemFormClickHandler(e){
		e.preventDefault();
		setViewCreateItemForm(true);
	}

	function submitNewItemClickHandler(e){
		e.preventDefault();
		setViewCreateItemForm(false);
		createNewItem();
	}

	function deleteItemClickHandler(e){
		e.preventDefault();
		deleteSingleitem(e.currentTarget.value);
	}


	/*----------------------React Renderer----------------------------------*/

	useEffect(() => {
		fetchAllItems();
	}, []);


	return (
		<main>	
			<h1>Item Shop</h1>
			<h2>All Items</h2>
			{
			viewCreateItemForm ? <ItemForm newItem = {newItem} setNew = {setNewItem} submit = {submitNewItemClickHandler}/> 
			: viewSingleItem ? <>
				<Item item = {singleItem} />
				<button onClick = {backClickHandler}>Back to Shop</button
				><button onClick = {deleteItemClickHandler} value={singleItem.id}>Delete Item</button>
			</> 
			: <>
				<button onClick = {newItemFormClickHandler}>Make new Item</button>
				<ItemsList items = {allItems} click = {itemClickHandler}/>
			</>
			}
		</main>
	)

}