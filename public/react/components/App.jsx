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

	/*--------------------View Check variables------------------------------------*/
	const [viewSingleItem, setViewSingleItem] = useState(false);
	const [viewCreateItemForm, setViewCreateItemForm] = useState(false);
	const [viewUpdateSingleItem, setViewUpdateSingleItem] = useState(false);

	/*--------------------New Item variable------------------------------------*/
	const [newItem, setNewItem] = useState({
		name: "",
		description: "",
		price: 0,
		category: "",
		image: ""
	});

	/*--------------------Item update variables------------------------------------*/
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
			
			if(!itemData){
				throw new Error("Error fetching all items in App.jsx");
			}

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

			if(!itemData){
				throw new Error("Error fetching a single Item in App.jsx");
			}

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

			const itemData = await response.json();

			if(!itemData){
				throw new Error("Error deleting Item in App.jsx");
			}

			fetchAllItems();
			setViewSingleItem(false);

		}catch(error){
			console.log("Error in React App deleteSingleitem");
		}
	  };

	/*----------------------Create New Item----------------------------------*/
	async function createNewItem() {
		try{

			if(!newItem){
				throw new Error("Item to add not found in App.jsx");
			}

			const res = await fetch(`${apiURL}/items`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newItem)
			});
		
			const itemData = await res.json();
			setAllItems([
				...allItems, newItem
			]);

			if(!itemData){
				throw new Error("Error creating new Item in App.jsx")
			}

			setNewItem({
				name: "",
				description: "",
				price: 0,
				category: "",
				image: ""
			});

			fetchAllItems();

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
			if(newItemPrice > -1){
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

			const res = await fetch(`${apiURL}/items/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(itemUpdater)
			});
			
			const itemData = await res.json();

			if(!itemData){
				throw new Error("Error Updating single Item in App.jsx")
			}

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
		setViewSingleItem(!viewSingleItem);
		setSingleItem({});
		fetchAllItems();
	}
	
	function newItemFormClickHandler(e){
		e.preventDefault();
		setViewCreateItemForm(!viewCreateItemForm);
	}

	function submitNewItemClickHandler(e){
		e.preventDefault();
		setViewCreateItemForm(!viewCreateItemForm);
		createNewItem();
	}

	function deleteItemClickHandler(e){
		e.preventDefault();
		deleteSingleItem(e.currentTarget.value);
	}

	function updateItemClickHandler(e){
		e.preventDefault();
		setViewSingleItem(!viewSingleItem);
		setViewUpdateSingleItem(!viewUpdateSingleItem);
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
			<div id='title-button-flex'>
				<h1 id='shop-title'>Item Shop</h1>
				{viewSingleItem ? 				
					<button className='btn btn-dark' onClick = {backClickHandler}>Back to Shop</button>
				: viewCreateItemForm ?
					<button className='btn btn-outline-danger' onClick={newItemFormClickHandler}>Cancel</button>
				: viewUpdateSingleItem ?
					<button className='btn btn-outline-danger' onClick={updateItemClickHandler}>Cancel</button>
				:
					<button className='btn btn-outline-dark' onClick = {newItemFormClickHandler}>Make New Item</button>
				}
			</div><br />
			
			{
			viewCreateItemForm ? 
			<>
				<h2>Add Item</h2>
				<ItemForm newItem = {newItem} setNew = {setNewItem} submit = {submitNewItemClickHandler}/> 
			</>
			: viewUpdateSingleItem ? 
			<>
				<h2>Update Item</h2>
				<UpdateItemForm setNewItemName = {setNewItemName} 
					setNewItemDescription = {setNewItemDescription} 
					setNewItemCategory = {setNewItemCategory} setNewItemPrice = {setNewItemPrice} 
					setNewItemImage = {setNewItemImage} submit = {submitSingleItemUpdateHandler}
				/> 
			</>
			: viewSingleItem ? <>
				<Item item = {singleItem} />
					<div id='button-div'>
						<div id='left'>
							<button id='updateBtn' className='btn btn-outline-dark' onClick = {updateItemClickHandler} value = {singleItem.id}>Update Item</button>
							<button className='btn btn-outline-danger' onClick = {deleteItemClickHandler} value={singleItem.id}>Delete Item</button>
						</div>
					</div>

			</> 
			: <>
				<h2>All Items</h2>
				<ItemsList items = {allItems} click = {itemClickHandler}/>
			</>
			}
		</main>
	)

}