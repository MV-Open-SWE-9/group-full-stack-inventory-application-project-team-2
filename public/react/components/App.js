import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { ItemsList } from './ItemsList';
import {Item} from './Item';
import { ItemForm } from './ItemForm';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	//const [sauces, setSauces] = useState([]);
	const [items, setItems] = useState([]);
	const [item, setItem] = useState({})
	const [singleItem, setSingleItem] = useState(false);
	const [createItem, setCreateItem] = useState(false);
	const [newItem, setNewItem] = useState({
		name: "",
		description: "",
		price: 0,
		category: "",
		image: ""
	});

	// async function fetchSauces(){
	// 	try {
	// 		const response = await fetch(`${apiURL}/sauces`);
	// 		const saucesData = await response.json();
			
	// 		setSauces(saucesData);
	// 	} catch (err) {
	// 		console.log("Oh no an error! ", err)
	// 	}
	// }

	async function fetchItems(){
		try{
			const res = await fetch(`${apiURL}/items`);
			const itemData = await res.json();
			
			console.log("itemData:");
			console.log(itemData);
			
			setItems(itemData);
			console.log("items:");
			console.log(items);
		}catch(err){
			console.log("Error in fetchItems");
		}
	}

	async function fetchItem(id){
		try {
			const res = await fetch(`${apiURL}/items/${id}`);
			const itemData = await res.json();

			setItem(itemData);
			setSingleItem(true);

		}  catch(err){
			console.log("Error in fetching one item");
		}
	};

	function clickHandler(e){
		e.preventDefault();
		fetchItem(e.currentTarget.value);
	}

	function handleBackClick(e){
		e.preventDefault();
		setSingleItem(false);
		setItem({});
	}
	
	function formClick(e){
		e.preventDefault();
		setCreateItem(true);
	}

	function handleItemSubmit(e){
		e.preventDefault();
		console.log(newItem);
		setCreateItem(false);
		handleFormSubmit();
	}

	async function handleFormSubmit() {
		const res = await fetch(`${apiURL}/items`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newItem)
		})
		const data = res.json();
		setItems([...items, newItem]);
		setNewItem({
			name: "",
			description: "",
			price: 0,
			category: "",
			image: ""
		})
	}

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<main>	
      		{/*<h1>Sauce Store</h1>
			<h2>All things 🔥</h2>
			<SaucesList sauces={sauces} />*/}
			<h1>Item Shop</h1>
			<h2>All Items</h2>
			{createItem ? <ItemForm newItem = {newItem} setNew = {setNewItem} submit = {handleItemSubmit}/> : singleItem ? <><Item item = {item} /> <button onClick = {handleBackClick}>Back to Shop</button></> : <><button onClick = {formClick}>Make new Item</button><ItemsList items = {items} click = {clickHandler}/></>}
		</main>
	)

	// fetching all items 
	
	// async function fetchItems(){
	// 	try {
	// 		const response = await fetch(`${apiURL}/item`);
	// 		const itemData = await response.json();
			
	// 		setItems(itemData);
	// 	} catch (err) {
	// 		console.log("Oh no an error! ", err)
	// 	}
	// }

	// useEffect(() => {
	// 	fetchItems();
	// }, []);

	// return (
	// 	<main>	
    //   <h1>Sauce Store</h1>
	// 		<h2>All things 🔥</h2>
	// 		<ItemsList items={items} />
	// 	</main>
	// )

}