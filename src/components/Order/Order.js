import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
	const ingredinets =[];
	for (let ingredientName in props.ingredients){
		ingredinets.push({
			name:ingredientName,
			amount:props.ingredients[ingredientName]});
	}
	const ingredientOutput = ingredinets.map( ig => {
		return <span
			style={{
				textTransform:'capitalize',
				display: 'inline-block',
				margin: '0 8px',
				border: '1px solid #ccc',
				padding: '4px'
			}}
			key={ig.name}>{ig.name}:({ig.amount}) </span>
	})
	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>Price: <strong>USD {props.price}</strong></p>
		</div>
	);
};

export default order;