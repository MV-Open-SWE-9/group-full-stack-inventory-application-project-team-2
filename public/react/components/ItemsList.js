import React , { useState, useEffect } from 'react'; 
import { Item } from './Item'; 




//Front-end View for all Items , creating react compnonents to display the list of items. 

export const ItemsList = ({items, click}) => {
	return <>
		{
			items.map((item, idx) => {
				return <Item item={item} key={idx} click = {click} />
			})
		}
	</>
} 