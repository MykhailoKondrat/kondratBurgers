import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import axios from "../../axios-orders";


const  BurgerBuilder = props => {
	const [purchasing, setPurchasing] = useState(false);
	//dipsatch actions and get redux state
	const dispatch  = useDispatch();
	
	const ings = useSelector( state => state.burgerBuilder.ingredients );
	const price = useSelector( state => state.burgerBuilder.totalPrice );
	const error = useSelector( state => state.burgerBuilder.error) ;
	const isAuthenticated = useSelector( state => state.auth.token !==null );
	const authRedirectPath = useSelector( state => state.auth.authRedirectPath );
	
	const onIgredeintAdded = (ingName) => dispatch(actions.addIngredient(ingName));
	const onIgredeintRemoved = (ingName) => dispatch (actions.removeIngredient(ingName));
	const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[dispatch]);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath= (path) => dispatch(actions.setAuthRedirectPath(path));
	

	useEffect( () => onInitIngredients(), [onInitIngredients])
	
	const updatePurchase = ( ingredients ) => {
		const sum = Object.keys(ingredients)
			.map( igKey =>{
				return ingredients[igKey]
			})
			.reduce((sum,el) => {
				return sum+el
			},0);
			return sum > 0;
			
	}
	
	const purchaseHandler = () => {
		if (isAuthenticated){
			setPurchasing(true);
		} else {
			console.log('else in work');
			onSetAuthRedirectPath('/checkout');
			console.log(authRedirectPath);
			props.history.push('/auth');
		}
		
	}
	
	
	const purchaseCancelHandler = () => {
		setPurchasing(false);
	}
	
	const purchaseContinueHandler = () => {
		onInitPurchase();
		props.history.push('/checkout');
	}

	const disabledInfo = {
		...ings
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}
	let orderSummary = null;
	let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner  />;
	
	if ( ings ){
		burger = (
			<Aux>
				<Burger ingredients={ings}/>
				<BuildControls
					ingredientAdded = {onIgredeintAdded}				//ingredient type is passed inside BuildControls.js
					ingredientRemoved = {onIgredeintRemoved}			//ingredient type is passed inside BuildControls.js
					disabled={disabledInfo}
					price={price}
					purchasable={updatePurchase(ings)}
					ordered={purchaseHandler}
					isAuth={isAuthenticated}/>
			</Aux>);
		orderSummary = <OrderSummary
			ingredients={ings}
			price={price}
			purchaseCanceled={purchaseCancelHandler}
			purchaseContinued={purchaseContinueHandler}/>;
	}
	
	
	return(
		<Aux>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);

}


export default withErrorHandler(BurgerBuilder,axios);