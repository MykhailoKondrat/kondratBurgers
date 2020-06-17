import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';

const  Auth = props =>  {
	//form params object, default for useState
	const authForm = {
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Mail Address'
			},
			value: '',
			validation: {
				required: true,
				isEmail: true
			},
			valid: false,
			touched: false
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password'
			},
			value: '',
			validation: {
				required: true,
				minLength: 6
			},
			valid: false,
			touched: false
		}
	}
	const [formControls, setFormControls] = useState(authForm);
	const [isSignup, setIsSignup] = useState(true);
	
	const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;
	useEffect( () => {
		if (!buildingBurger && authRedirectPath !== '/'){
			onSetAuthRedirectPath();
		};
	},[buildingBurger, authRedirectPath, onSetAuthRedirectPath]);
	
	

	
	const inputChangedHandler = (event, controlName) => {
		const updatedForm = updateObject( formControls, {
			[controlName]: updateObject( formControls[controlName],{
				value: event.target.value,
				valid: checkValidity(event.target.value, formControls[controlName].validation),
				touched: true
			})
		});
		setFormControls(updatedForm);
	}
	
	const submitHandler = (event) => {
		event.preventDefault();
		props.onAuth(formControls.email.value, formControls.password.value, isSignup);
	}
	
	const switchAuthHandler = () => {
		setIsSignup(!isSignup);
	};
	
	//create form
	const formElementsArray = [];
	for ( let key in formControls ) {
		formElementsArray.push( {
			id: key,
			config: formControls[key]
		} );
	}
	
	let form = formElementsArray.map( formElement => (
		<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={( event ) => inputChangedHandler( event, formElement.id )} />
	) );
	
	//show spinner on loading
	if (props.loading) {
		form = <Spinner/>
	}
	//showing error on signup
	let errorMessage = null;
	
	if (props.error){
		errorMessage = (
			<p>{props.error}</p>
		)
	}
	//redirect on authentification
	
	let authRedirect=null;
	if(props.isAuthenticated){
		authRedirect=<Redirect to={props.authRedirectPath}/>
	}
	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType="Success">SUBMIT</Button>
			</form>
			<Button
				btnType="Danger"
				clicked={switchAuthHandler}>
				SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
				</Button>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		loading:state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup )),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);