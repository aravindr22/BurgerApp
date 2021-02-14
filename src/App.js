import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import AsyncComponent from './hoc/AsyncComponents/AsyncComponents';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/logout/logout';

const asyncCheckout = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = AsyncComponent(() => {
  return import('./containers/Auth/auth');
});

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {    
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    
    if(this.props.isAuthenticated){
      
      routes = (
        <Switch>
        <Route path="/Checkout" component={asyncCheckout} />        
        <Route path="/orders" component={asyncOrders} />        
        <Route path="/auth" component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
}; 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
