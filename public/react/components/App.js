import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { ItemsList } from './ItemsList';
import {Item} from './Item';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	//const [sauces, setSauces] = useState([]);
	const [items, setItems] = useState([]);
	const [item, setItem] = useState({})
	const [singleItem, setSingleItem] = useState(false);

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
			{singleItem ? <><Item item = {item} /> <button onClick = {handleBackClick}>Back to Shop</button></> : <ItemsList items = {items} click = {clickHandler}/>}
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