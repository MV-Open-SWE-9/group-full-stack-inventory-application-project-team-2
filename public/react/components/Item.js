import React from 'react';

/*--------------------Single Item, returns button with details of item prop passed------------------------------------*/

export const Item = ({item, click}) => {

  return <>
    <button className = "card" onClick = {click} value = {item.id}>
    <h3>{item.name}</h3>
    <img src={item.image} alt={item.name} />
    <h1>Description:</h1>
    <p>{item.description}</p>
    <h1>categories:</h1>
    <p><b>{item.category}</b></p>
    <h1>Price: {item.price}</h1>
    </button>
  </>
} 
