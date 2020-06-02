import * as actionTypes from  './actionTypes';
import axios from "../../axios-orders";
import { updateObject } from '../utility';
export const addIngredient = (name) => {
	
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

export const setIngredietns = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
};

export const fetchIngredientFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
}

export const initIngredients = () => {
	return dispatch => {
		axios.get('https://kondratburgers.firebaseio.com/ingredients.json')
		.then ( response => {
			dispatch(setIngredietns(response.data));
		}).catch(error => {
			dispatch(fetchIngredientFailed());
		});
	}
};