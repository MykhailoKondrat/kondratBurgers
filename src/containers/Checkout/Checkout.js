import React, { useState,useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = (props) => {
	const [ingredients,setIngredients] = useState(null);
	const [price,setPrice] = useState(0);

	const checkoutCancelledHandler = () =>{
		props.history.goBack();
	}
	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	}
	
	let summary = <Redirect to="/"/>
	
	if (props.ings){
		const purcchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
		summary = (
			<div>
				{purcchasedRedirect}
				<CheckoutSummary
				ingredients={props.ings}
				checkoutCancel={checkoutCancelledHandler}
				checkoutContinued={checkoutContinuedHandler}/>
				<Route
					path={props.match.path + '/contact-data'}
					component={ContactData}/>;
			</div>
		)
	}
	return summary
	
}
const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.orders.purchased
	}
}

export default connect(mapStateToProps)(Checkout);