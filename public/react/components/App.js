/*--------------------Required Imports------------------------------------*/
import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { ItemsList } from './ItemsList';
import {Item} from './Item';
import { ItemForm } from './ItemForm';
import { UpdateItemForm } from './updateItemForm';

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
	const [viewUpdateSingleItem, setViewUpdateSingleItem] = useState(false);
	const [newItemName, setNewItemName] = useState("");
	const [newItemDescription, setNewItemDescription] = useState("");
	const [newItemPrice, setNewItemPrice] = useState(-1);
	const [newItemCategory, setNewItemCategory] = useState("");
	const [newItemImage, setNewItemImage] = useState("");


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
	async function deleteSingleItem(id){
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
		
			const data = await res.json();
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

	/*----------------------Update Single Item----------------------------------*/
	async function updateSingleItem(id){
		try{
			
			let itemUpdater = {...singleItem};

			if(newItemName.length > 0){
				itemUpdater = {
					...itemUpdater,
					name: newItemName
				};
			}
			if(newItemDescription.length > 0){
				itemUpdater = {
					...itemUpdater,
					description: newItemDescription
				};
			}
			if(newItemPrice.length > -1){
				itemUpdater = {
					...itemUpdater,
					price: newItemPrice
				};
			}
			if(newItemCategory.length > 0){
				itemUpdater = {
					...itemUpdater,
					category: newItemCategory
				};
			}
			if(newItemImage.length > 0){
				itemUpdater = {
					...itemUpdater,
					image: newItemImage
				};
			}

			// console.log(itemUpdater);
			// console.log(id);
			const res = await fetch(`${apiURL}/items/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(itemUpdater)
			});
			
			const data = await res.json();
			// console.log(data);

			setNewItemName("");
			setNewItemDescription("");
			setNewItemPrice(-1);
			setNewItemCategory("");
			setNewItemImage("");

			fetchSingleItem(id);

			setViewUpdateSingleItem(false);
			setViewSingleItem(true);			

		}catch(error){
			console.log("Error in React updateSingleItem");
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
		fetchAllItems();
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
		deleteSingleItem(e.currentTarget.value);
	}

	function updateItemClickHandler(e){
		e.preventDefault();
		setViewSingleItem(false);
		setViewUpdateSingleItem(true);
	}

	function submitSingleItemUpdateHandler(e){
		e.preventDefault();
		updateSingleItem(singleItem.id);
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
			: viewUpdateSingleItem ? <UpdateItemForm setNewItemName = {setNewItemName} setNewItemDescription = {setNewItemDescription} 
										setNewItemCategory = {setNewItemCategory} setNewItemPrice = {setNewItemPrice} 
										setNewItemImage = {setNewItemImage} submit = {submitSingleItemUpdateHandler}/> 
			: viewSingleItem ? <>
				<button onClick = {updateItemClickHandler} value = {singleItem.id}>Update Item</button>
				<Item item = {singleItem} />
				<button onClick = {backClickHandler}>Back to Shop</button>
				<button onClick = {deleteItemClickHandler} value={singleItem.id}>Delete Item</button>
			</> 
			: <>
				<button onClick = {newItemFormClickHandler}>Make new Item</button>
				<ItemsList items = {allItems} click = {itemClickHandler}/>
			</>
			}
		</main>
	)

}