import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	//this could be functional component, no need to be a class
	render() {
		const ingredientsSummary = Object.keys(this.props.ingredients)
			.map( igKey => {
				return (
					<li key={igKey}>
						<span style={{textTransform: 'capitalize'}}>
							{igKey}: {this.props.ingredients[igKey]}
						</span>
					</li>
				);
			});
		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A Delicious burger with the following ingredients:</p>
				
				<ul>
					{ingredientsSummary}
				</ul>
				<p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
			</Aux>
		);
	}
};

export default OrderSummary;