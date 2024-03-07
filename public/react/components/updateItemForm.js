import React from "react";

//name, desc, price, cat, img
export const UpdateItemForm = (props) => {
	return <>
        <div className="form-container">
            <form id="update-item-form" onSubmit={props.submit}>
                <input type = "text" placeholder="Name" onChange = {e => props.setNewItemName(e.target.value)}/><br />
                <input type = "text" placeholder="Descrption" onChange={e => props.setNewItemDescription(e.target.value)}/><br />
                <input type = "number" placeholder="Price" onChange={e => props.setNewItemPrice(e.target.value)} /><br />
                <input type = "text" placeholder="Categories" onChange={e => props.setNewItemCategory(e.target.value)}/><br />
                <input type = "text" placeholder="Item Image (link)" onChange={e => props.setNewitemImage(e.target.value)}/><br />
                <button id="submit-button" className="btn btn-dark" type = "submit">Update Item!</button>
            </form>
        </div>
	</>
} 