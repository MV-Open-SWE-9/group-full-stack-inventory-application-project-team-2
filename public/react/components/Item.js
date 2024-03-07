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
            <h3>{item.name}</h3><br />
            <p id='price'>${item.price}</p><br/>
            <h5>Description:</h5>
            <p>{item.description}</p><br/><br/>
            <h5>Category:</h5>
            <p id="category">
              {item.category}
            </p>
          </div>
        </div>
      </button>
    </>
  );
} 
