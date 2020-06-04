import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Route, withRouter, Switch,Redirect }  from 'react-router-dom';
import BurgerBuilder from "./containers/BurgerBuild/BurgerBuilder";
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from  './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent( () => {
    return import ('./containers/Checkout/Checkout');
    }
);

const asyncOrders = asyncComponent( () => {
    return import ('./containers/Orders/Orders');
    }
);

const asyncAuth = asyncComponent( () => {
    return import ('./containers/Auth/Auth');
    }
);

class App extends Component{
    componentDidMount(){
        this.props.onTryAutoSignUp();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/logout" component={Logout}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return(
            <div>
                <Layout>
                    {routes};
                </Layout>
            </div>
         );
    }
}
const mapStateToProps = state => {
    return{
        isAuthenticated : state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: ()=> dispatch(actions.authCheckState())
    };
};

export default withRouter(connect (mapStateToProps, mapDispatchToProps)(App));

//TODO - branch to WIP
//     - adjust button styles
//     - adject items alignment
