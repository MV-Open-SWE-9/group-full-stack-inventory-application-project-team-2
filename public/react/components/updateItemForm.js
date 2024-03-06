import React from "react";

//name, desc, price, cat, img
export const UpdateItemForm = (props) => {
	return <>
		<form onSubmit={props.submit}>
            <input type = "text" placeholder="Name" onChange = {e => props.setNewItemName(e.target.value)}/>
            <input type = "text" placeholder="Descrption" onChange={e => props.setNewItemDescription(e.target.value)}/>
            <input type = "number" placeholder="Price" onChange={e => props.setNewItemPrice(e.target.value)} />
            <input type = "text" placeholder="Categories" onChange={e => props.setNewItemCategory(e.target.value)}/>
            <input type = "text" placeholder="Item image (link)" onChange={e => props.setNewitemImage(e.target.value)}/>
            <button type = "submit">Update Item!</button>
        </form>
	</>
} 