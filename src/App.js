import React, { useEffect, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Route, withRouter, Switch, Redirect }  from 'react-router-dom';
import BurgerBuilder from "./containers/BurgerBuild/BurgerBuilder";
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy( () => {
    return import ('./containers/Checkout/Checkout');
    }
);

const Orders = React.lazy( () => {
    return import ('./containers/Orders/Orders');
    }
);

const Auth = React.lazy( () => {
    return import ('./containers/Auth/Auth');
    }
);

const App = props => {
    
    const { onTryAutoSignUp } = props;
    useEffect( () => {
        onTryAutoSignUp();
    }, [onTryAutoSignUp]);
    
    let routes = (
        <Switch>
            <Route path="/auth" render={(props)=><Auth {...props}/>} />
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
    );
    if (props.isAuthenticated){
        routes = (
            <Switch>
                <Route path="/" exact render={(props)=><BurgerBuilder {...props}/>}/>
                <Route path="/checkout" render={(props)=><Checkout {...props}/>}/>
                <Route path="/auth"  render={(props)=><Auth {...props}/>}/>
                <Route path="/orders" render={(props)=><Orders {...props}/>}/>
                <Route path="/logout" render={(props)=><Logout {...props}/>}/>
                <Redirect to="/"/>
            </Switch>
        );
    }
    return(
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>;
            </Layout>
        </div>
     );
};

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
