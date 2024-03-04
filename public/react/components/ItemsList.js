import React , { useState, useEffect } from 'react'; 
import { Sauce } from './Sauce'; 




//Front-end View for all Items , creating react compnonents to display the list of items. 

export const itemsList = ({Item}) => {
	return <>
		{
			Item.map((item, idx) => {
				return <Item item={item} key={idx} />
			})
		}
	</>
} 