import React from "react";

//name, desc, price, cat, img
export const ItemForm = (props) => {
	return <>
        <div className="form container">
            <form id="new-item-form" onSubmit={props.submit}>
                <input type = "text" placeholder="Name" onChange = {e => props.setNew({...props.newItem, name: e.target.value})}/><br />
                <input type = "text" placeholder="Descrption" onChange={e => props.setNew({...props.newItem, description: e.target.value})}/>
                
                <div className="flex" id="price-cat-container">
                    <input id="price-input" type = "number" placeholder="Price" onChange={e => props.setNew({...props.newItem, price: e.target.value})} /><br />
                    <input type = "text" placeholder="Categories" onChange={e => props.setNew({...props.newItem, category: e.target.value})}/>
                </div>
                
                <input type = "text" placeholder="Item Image (link)" onChange={e => props.setNew({...props.newItem, image: e.target.value})}/><br />
                <button id="submit-button" className="btn btn-dark" type = "submit">Create Item!</button>
            </form>
        </div>
	</>
} 