import React from "react";

//name, desc, price, cat, img
export const ItemForm = (props) => {
	return <>
		<form onSubmit={props.submit}>
            <input type = "text" placeholder="Name" onChange = {e => props.setNew({...props.newItem, name: e.target.value})}/>
            <input type = "text" placeholder="Descrption" onChange={e => props.setNew({...props.newItem, description: e.target.value})}/>
            <input type = "number" placeholder="Price" onChange={e => props.setNew({...props.newItem, price: e.target.value})} />
            <input type = "text" placeholder="Categories" onChange={e => props.setNew({...props.newItem, category: e.target.value})}/>
            <input type = "text" placeholder="Item image (link)" onChange={e => props.setNew({...props.newItem, image: e.target.value})}/>
            <button type = "submit">Create Item!</button>
        </form>
	</>
} 