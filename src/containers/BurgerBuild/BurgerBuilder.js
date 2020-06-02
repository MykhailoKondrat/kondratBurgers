import React, { Component } from "react";
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import axios from "../../axios-orders";


class BurgerBuilder extends Component{
	state = {
		
		purchasing:false,		//local state
		
	}
	
	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredients();
		
	}

	updatePurchase (ingredients) {
		const sum = Object.keys(ingredients)
			.map( igKey =>{
				return ingredients[igKey]
			})
			.reduce((sum,el) => {
				return sum+el
			},0);
			return sum > 0;
			
	}
	
	purchaseHandler = () => {
		this.setState({
			purchasing:true
		});
	}
	
	
	purchaseCancelHandler = () => {
		this.setState({purchasing:false})
	}
	
	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	}
	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner  />;
		
		if ( this.props.ings ){
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls
						ingredientAdded = {this.props.onIgredeintAdded}				//ingredient type is passed inside BuildControls.js
						ingredientRemoved = {this.props.onIgredeintRemoved}			//ingredient type is passed inside BuildControls.js
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatePurchase(this.props.ings)}
						ordered={this.purchaseHandler}/>
				</Aux>);
			orderSummary = <OrderSummary
				ingredients={this.props.ings}
				price={this.props.price}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}/>;
		}
		
		
		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}
const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	}
}
const mapDispatchToProps = dispatch => {
	return{
		onIgredeintAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIgredeintRemoved: (ingName) => dispatch (actions.removeIngredient(ingName)),
		onInitIngredients : () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit())
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));