import React from 'react';

/*--------------------Single Item, returns button with details of item prop passed------------------------------------*/

export const Item = ({item, click}) => {

  return (
    <>
      <button className="card" onClick={click} value={item.id}>
        <div id="flex-container">
          <div id="img-container">
            <img src={item.image} alt={item.name} />
          </div>

          <div id="item-details">
            <h3>{item.name}</h3>
            <h1>${item.price.toFixed(2)}</h1>
            <h3>Description:</h3>
            <p>{item.description}</p>
            <h3>Categories:</h3>
            <p id="category">
              <b>{item.category}</b>
            </p>
          </div>
        </div>
      </button>
    </>
  );
} 
