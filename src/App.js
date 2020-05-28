import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Route }  from 'react-router-dom';
import BurgerBuilder from "./containers/BurgerBuild/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
class App extends Component{
    render() {
        return(
            <div>
                <Layout>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                </Layout>
            </div>
         );
    }
}
export default App;

//TODO - branch to WIP
//     - adjust button styles
//     - adject items alignment
