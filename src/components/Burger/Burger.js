import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import {withRouter} from 'react-router-dom';

const burger = (props) => {
	console.log(props);
	let transformedIngredienst = Object.keys(props.ingredients)
		.map(igKey => {
			return ([ ...Array(props.ingredients[igKey])]
				.map( (_, i) =>
					{
					return <BurgerIngredient key={igKey + i} type={igKey}/>;
					}
				));
		})
		.reduce((arr, el) => { return arr.concat(el)},
			[]
		);
	if( transformedIngredienst.length === 0){
		transformedIngredienst = <p>Please start adding ingredients</p>;
	}

	return(
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
			{transformedIngredienst}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	)
};

export default withRouter(burger);