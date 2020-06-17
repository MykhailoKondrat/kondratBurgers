import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const changeIngredient = (state,action,value = 1) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + value};
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const updatedState = {
		ingredients:updatedIngredients,
		//check to add or to subtract price from total based on value
		totalPrice: value === 1 ? state.totalPrice + INGREDIENT_PRICES[action.ingredientName] : state.totalPrice - INGREDIENT_PRICES[action.ingredientName] ,
		building:true
	}
	return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
	return updateObject( state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		totalPrice: 4,
		error: false,
		building:false
	} );
};

const fetchIngredientsFailed = (state, action) => {
	return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.ADD_INGREDIENT: return changeIngredient( state, action, +1 );
		case actionTypes.REMOVE_INGREDIENT: return changeIngredient(state, action, -1);
		case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
		default: return state;
	}
};

export default reducer;