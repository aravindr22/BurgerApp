import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients: null,
        totalPrice: 0
    }

    UNSAFE_componentWillMount (){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        var price = 0;
        for(let params of query.entries()){
            if(params[0] === 'price'){
                price = params[1]
            } else {
                ingredients[params[0]] = +params[1]             //A plus in a front converts string to integer
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render() {

        return(
            <div>
                <CheckoutSummary 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}/>
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    render={(props) => (<ContactData 
                                        ingredients={this.state.ingredients}
                                        totalPrice={this.state.totalPrice} 
                                        {...props} />)} />
            </div>
        );
    };

}

export default Checkout;